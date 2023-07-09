<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2" crossorigin="anonymous"></script>
    <style>
        body {
            text-align: center;
            padding: 40px 0;
            background: #EBF0F5;
        }
        .card {
            background: white;
            padding: 10px;
            border-radius: 4px;
            box-shadow: 0 2px 3px #C8D0D8;
            display: inline-block;
            margin: 0 auto;
            width: 500px;
        }
    </style>
    <title>Document</title>
</head>
<body>
    <div class="card">
        <div style="display: flex; align-items: center; ">
            <div style="display: flex">
                {{-- <img style="width: 30px; height: 30px; border-radius: 50%" src="{{url('images/logo/BillLogo.png')}}" /> --}}
                <div style="margin-left: 2px">
                        {{-- <h1 style="background: linear-gradient(to right, #7928CA, #FF0080);
                            -webkit-background-clip: text;
                            -webkit-text-fill-color: transparent;
                            text-transform: uppercase;
                            font-size: 20px;
                            font-weight: bold;
                            margin: 0;
                        ">CPM</h1> --}}
                        <h1 style="color: #FF0080;
                            font-size: 20px;
                            font-weight: bold;
                            margin: 0;
                        ">CPM</h1>
                        <p style="color: gray; font-size: 12px">CINEMA PRO MAX</p>
                </div>
            </div>
            <h1 style="font-size: 20px; margin-left: auto; font-weight: bold">
                SUCCESS
            </h1>
            {{-- <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-check" viewBox="0 2 16 16">
                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
            </svg> --}}
        </div>
        <hr style="margin: 0">
        <div style="display: flex; align-items: center; justify-content: center">
            {{-- <p style="margin-top: 20px; font-size: 30px; font-weight: bold; color: green;">
                SUCCESS!
            </p> --}}
            <p style="margin-top: 20px; font-size: 30px; font-weight: bold; color: green;">
                THANH TOÁN THÀNH CÔNG!
            </p>
        </div>
        {{-- <div style="align-items: center; display: flex; justify-content: center;">
            <div style="border: 10px; border-style: solid; border-color: green; border-radius: 50%; width: 300px; height: 300px;">
                <svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" fill="green" class="bi bi-check" viewBox="0 0 16 16">
                    <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                </svg>
            </div>
        </div> --}}
        {{-- <p style="margin-top: 20px; font-size: 30px; font-weight: bold; color: gray;">
            THANH TOÁN THÀNH CÔNG!
        </p> --}}
        <hr style="margin: 0">
        <p style="margin-top: 20px; font-size: 30px; font-weight: bold; color: black;">
            Tổng Cộng: {{$total}}đ
        </p>
    </div>
</body>
</html>