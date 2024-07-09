import Pagination from '@/Components/Pagination';
import PostCard from '@/Components/PostCard';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';

export default function Dashboard({ auth }) {

    // desturct props posts
    const { posts } =  usePage().props;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                        {posts.data.map((post, i) => <PostCard post={post} key={i}/>)}
                    </div>
                    <div className='flex items-center justify-center'>
                        {posts.last_page !== 1 && (<Pagination links={posts.links}/>)}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
