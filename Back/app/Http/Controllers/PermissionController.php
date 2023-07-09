<?php

namespace App\Http\Controllers;

use App\Http\Resources\permissionResource;
use App\Models\permission;
use Illuminate\Http\Request;

class PermissionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $permissions = permissionResource::collection(permission::all());
        return response()->json($permissions);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->all();
        if(is_null($data)){
            return response()->json(['message'=>'failed to create permission'], 404);
        }
        $permission = permission::create($data);
        $permission->action()->sync((array)$request->action);

        return response()->json(new permissionResource($permission));
    }

    public function addAction(Request $request, $id){
        $permission = permission::findOrFail($id);
        if(is_null($permission)){
            return response()->json(['message'=>'permission not found'], 404);
        }
        if(is_null($request->action)){
            return response()->json(new permissionResource($permission));
        }
        $permission->update($request->all());
        $permission->action()->sync((array)$request->action);
        return response()->json(new permissionResource($permission));
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $permission = permission::findOrFail($id);
        if(is_null($permission)){
            return response()->json(['message'=>'permission not found'], 404);
        }
        if(is_null($request->action)){
            return response()->json(new permissionResource($permission));
        }
        $permission->update($request->all());
        $permission->action()->sync((array)$request->action);
        return response()->json(new permissionResource($permission));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $permission = permission::find($id);
        if(is_null($permission)) {
            return response()->json(['message'=>'permission not found'], 404);
        }
        $permission->delete();
        $permissions = permissionResource::collection(permission::all());
        
        return response()->json($permissions);
    }
}
