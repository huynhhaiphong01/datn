from flask import *
import pandas as pd
import numpy as np
import scipy.stats
import seaborn as sns
from flask_cors import CORS
from flask import request
from flask import jsonify
# Similarity
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)
CORS(app)

ratings=pd.read_csv('D:/DATN/Re/ml-latest-small/ratings.csv')
movies = pd.read_csv('D:/DATN/Re/ml-latest-small/movies.csv')


df = pd.merge(ratings, movies, on='movieId', how='inner')
# Aggregate by movie
agg_ratings = df.groupby('title').agg(mean_rating = ('rating', 'mean'),
                                                number_of_ratings = ('rating', 'count')).reset_index()

# Keep the movies with over 100 ratings
agg_ratings_GT100 = agg_ratings[agg_ratings['number_of_ratings']>100]

# Visulization
#ns.jointplot(x='mean_rating', y='number_of_ratings', data=agg_ratings_GT100)

# Merge data
df_GT100 = pd.merge(df, agg_ratings_GT100[['title']], on='title', how='inner')

# Create user-item matrix
matrix = df_GT100.pivot_table(index='userId', columns='title', values='rating')

# Normalize user-item matrix
matrix_norm = matrix.subtract(matrix.mean(axis=1), axis = 'rows')

# User similarity matrix using Pearson correlation
user_similarity = matrix_norm.T.corr()

# User similarity matrix using cosine similarity
#user_similarity_cosine = cosine_similarity(matrix_norm.fillna(0))
#user_similarity = pd.DataFrame(user_similarity_cosine)
# Number of similar users
n = 10
# User similarity threashold
user_similarity_threshold = 0.3

def movie_score(id):
# Pick a user ID
    picked_userid = id
# Remove picked user ID from the candidate list
    #user_similarity.drop(index=picked_userid, inplace=True)

# Get top n similar users
    similar_users = user_similarity[user_similarity[picked_userid]>user_similarity_threshold][picked_userid].sort_values(ascending=False).iloc[:n]

# Remove movies that have been watched
    picked_userid_watched = matrix_norm[matrix_norm.index == picked_userid].dropna(axis=1, how='all')

# Movies that similar users watched. Remove movies that none of the similar users have watched
    similar_user_movies = matrix_norm[matrix_norm.index.isin(similar_users.index)].dropna(axis=1, how='all')
# Remove the watched movie from the movie list
    similar_user_movies.drop(picked_userid_watched.columns,axis=1, inplace=True, errors='ignore')

# A dictionary to store item scores
    item_score = {}
# Loop through items
    for i in similar_user_movies.columns:
  # Get the ratings for movie i
        movie_rating = similar_user_movies[i]
        total = 0
        count = 0
  # Loop through similar users
        for u in similar_users.index:
    # If the movie has rating
            if pd.isna(movie_rating[u]) == False:
                score = similar_users[u] * movie_rating[u]
                total += score
                count += abs(similar_users[u])
  # Get the average score for the item
        item_score[i] = total / count

    item_score = pd.DataFrame(item_score.items(), columns=['movie', 'movie_score'])
# Sort the movies by score
    ranked_item_score = item_score.sort_values(by='movie_score', ascending=False)

# Select top m movies
    m = 5
# Average rating for the picked user
    avg_rating = matrix[matrix.index == picked_userid].T.mean()[picked_userid]

# Calcuate the predicted rating
    ranked_item_score['predicted_rating'] = ranked_item_score['movie_score'] + avg_rating
    ranked_item_score = ranked_item_score.head(m)
    return ranked_item_score

@app.route('/pre', methods=['GET', 'POST'])
def get_re():
    if request.method == 'POST':
        print('-----------------------------------------------------------------')
        
        # Get the file from post request
        data = request.json.get('user_id')
        result = movie_score(data)
        return result.to_json( orient= 'records')
    return None

if __name__ == '__main__':
    app.run(debug=True)