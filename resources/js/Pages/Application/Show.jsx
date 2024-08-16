import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextArea from '@/Components/TextArea';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { FormatDate } from '@/Utils';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create({ auth,application }) {
    const { data, setData } = useForm({
        name: application.name,
        email: application.email,
        resume: application.resume,
        type: application.type,
        cover_letter: application.cover_letter,
        title: application.job_vacancy?.title,
        apply_date: FormatDate(application.created_at,'yyyy-MM-dd HH:mm'),
    });
    
    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Create New Job" />

            <div className="px-5 py-12">
                <div className="w-full md:w-1/2 mx-auto shadow-sm rounded-lg">
                    <div className="bg-white p-5 rounded-t-lg">
                        <h1 className='mb-5'>Application Job : <span className='text-orange-600 font-semibold'>{data.title}</span></h1>
                        <div className='mb-5'>
                            <InputLabel htmlFor="name" value="name"/>
                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="block w-full bg-gray-50"
                                autoComplete="name"
                                placeholder="name"
                                readOnly
                            />
                        </div>

                        <div className='mb-5'>
                            <InputLabel htmlFor="email" value="email"/>
                            <TextInput
                                id="email"
                                name="email"
                                value={data.email}
                                className="block w-full bg-gray-50"
                                autoComplete="email"
                                placeholder="email"
                                readOnly
                            />
                        </div>

                        <div className='mb-5'>
                            <InputLabel htmlFor="cover_letter" value="Cover Letter"/>
                            <TextArea
                                id="cover_letter"
                                name="cover_letter"
                                value={data.cover_letter}
                                className="block w-full bg-gray-50"
                                autoComplete="cover_letter"
                                placeholder="Cover Letter"
                                onChange={(e) => setData('cover_letter', e.target.value)}
                            />
                        </div>
                        <div className='mb-5'>
                            <InputLabel htmlFor="apply_date" value="Apply Date"/>
                            <TextInput
                                id="apply_date"
                                name="apply_date"
                                type="datetime-local"
                                value={data.apply_date}
                                className="block w-full bg-gray-50"
                                autoComplete="Apply Date"
                                placeholder="apply_date"
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="bg-gray-100 p-5 rounded-b-lg gap-3 flex justify-end items-center">
                        <Link href={route('application.index')}>
                            <SecondaryButton>Close</SecondaryButton>
                        </Link>
                        <a href={data.resume} target="_BLANK">
                            <PrimaryButton>Resume</PrimaryButton>
                        </a>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
