import React from 'react'
import { Head, usePage, useForm } from '@inertiajs/react';
import { IconPencilCog, IconPlus } from '@tabler/icons-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Container from '@/Components/Container';
import Table from '@/Components/Table';
import Button from '@/Components/Button';
import Pagination from '@/Components/Pagination';
import Search from '@/Components/Search';
import hasAnyPermission from '@/Utils/Permissions';
import Modal from '@/Components/Modal';
import Card from '@/Components/Card';
import Input from '@/Components/Input';
import Textarea from '@/Components/Textarea';
import Swal from 'sweetalert2';
export default function Index({auth}) {

    // destruct posts props
    const { posts } = usePage().props;

    // define state with helper inertia
    const { data, setData, post, errors, transform } = useForm({
        id: '',
        title : '',
        content : '',
        modalOpen: false,
        isUpdateMode: false,
    })

    // define method handleModalUpdate
    const handleModalUpdate = (post) => {
        console.log(post);
        setData(prevData => ({
            ...prevData,
            id: post.id,
            title: post.title,
            content: post.content,
            modalOpen: true,
            isUpdateMode: true
        }))
    }

    transform((data) => ({
        ...data,
        _method: data.isUpdateMode ? 'put' : 'post',
    }))


    // define method handleStoreData
    const handleStoreData = async (e) => {
        e.preventDefault();

        post(route('posts.store'), {
            onSuccess: () => {
                setData('modalOpen', !data.modalOpen);
                Swal.fire({
                    title: 'Success!',
                    text: 'Data created successfully!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        });
    }

    // define method handleUpdateData
    const handleUpdateData = async (e) => {
        e.preventDefault();

        post(route('posts.update', data.id), {
            onSuccess: () => {
                setData('modalOpen', !data.modalOpen);
                Swal.fire({
                    title: 'Success!',
                    text: 'Data updated successfully!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        });
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Posts</h2>}
        >
            <Head title={'Posts'}/>
            <Container>
                <Modal show={data.modalOpen} onClose={() => setData('modalOpen', false)}>
                    <Card title={data.isUpdateMode ? 'Update Post' : 'Create New Post'}>
                        <form onSubmit={data.isUpdateMode ? handleUpdateData : handleStoreData}>
                            <div className='mb-4'>
                                <Input label={'Title'} type={'text'} value={data.title} onChange={e => setData('title', e.target.value)} errors={errors.title} placeholder="Input title post.."/>
                            </div>
                            <div className='mb-4'>
                                <Textarea rows={4} label={'Content'} value={data.content} onChange={e => setData('content', e.target.value)} errors={errors.content} placeholder="Input content post.."/>
                            </div>
                            <div className='flex items-center gap-2'>
                                <Button type={'submit'}/>
                            </div>
                        </form>
                    </Card>
                </Modal>
                <div className='mb-4 flex items-center justify-between gap-4'>
                    {hasAnyPermission(['posts-create']) &&
                        <Button className={'bg-white text-gray-700 hover:bg-gray-100'} type={'modal'} onClick={() => setData({modalOpen: !data.modalOpen})}>
                            <IconPlus size={18} strokeWidth={1.5}/> <span className='hidden lg:flex'>Create New Data</span>
                        </Button>
                    }
                    <div className='w-full md:w-4/6'>
                        <Search url={route('posts.index')} placeholder={'Search posts data by title...'}/>
                    </div>
                </div>
                <Table.Card title={'Posts'}>
                    <Table>
                        <Table.Thead>
                            <tr>
                                <Table.Th>#</Table.Th>
                                <Table.Th>Title</Table.Th>
                                <Table.Th>Content</Table.Th>
                                <Table.Th>Action</Table.Th>
                            </tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {posts.data.map((post, i) => (
                                <tr key={i}>
                                    <Table.Td>{++i + (posts.current_page-1) * posts.per_page}</Table.Td>
                                    <Table.Td>{post.title}</Table.Td>
                                    <Table.Td>
                                        <div className='whitespace-pre-wrap'>
                                            {post.content}
                                        </div>
                                    </Table.Td>
                                    <Table.Td>
                                        <div className='flex items-center gap-2'>
                                            {hasAnyPermission(['post-update']) &&
                                                <Button className={'bg-orange-50 text-orange-500 hover:bg-orange-100 border-0'} type={'modal'} onClick={() => handleModalUpdate(post)}>
                                                    <IconPencilCog size={18} strokeWidth={1.5}/>
                                                </Button>
                                            }
                                            {hasAnyPermission(['posts-delete']) &&
                                                <Button type={'delete'} url={route('posts.destroy', post.id)}/>
                                            }
                                        </div>
                                    </Table.Td>
                                </tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                </Table.Card>
                <div className='flex items-center justify-center'>
                    {posts.last_page !== 1 && (<Pagination links={posts.links}/>)}
                </div>
            </Container>
        </AuthenticatedLayout>
    )
}
