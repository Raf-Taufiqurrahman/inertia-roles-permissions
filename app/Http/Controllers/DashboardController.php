<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        // get posts
        $posts = Post::with('user')
            ->when($request->search,function($query) use($request){
                $query->where('title', 'like', '%'.$request->search.'%')
                    ->orWhereHas('user', fn($query) => $query->where('name', 'like', '%'.$request->search.'%'));
            })
            ->latest()->paginate(12)->withQueryString();

        // render view
        return inertia('Dashboard', ['posts' => $posts]);
    }
}
