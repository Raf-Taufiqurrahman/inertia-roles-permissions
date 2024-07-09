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
        $posts = Post::with('user')->latest()->paginate(12);

        // render view
        return inertia('Dashboard', ['posts' => $posts]);
    }
}
