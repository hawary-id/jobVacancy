import InputLabel from '@/Components/InputLabel';
import Guest from '@/Layouts/GuestLayout';
import { FormatDate, FormatNumber } from '@/Utils';
import { Head, Link, useForm } from '@inertiajs/react';
import { IoCalendar } from "react-icons/io5";
import { BsGeoAltFill } from "react-icons/bs";
import { GoBookmarkFill } from "react-icons/go";
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import Swal from 'sweetalert2';
import TextArea from '@/Components/TextArea';
import SecondaryButton from '@/Components/SecondaryButton';
import PrimaryButton from '@/Components/PrimaryButton';
import Loading from '@/Components/Loading';

export default function Apply({ auth, job }) {
    const { data, setData, post, processing, errors } = useForm({
        job_vacancy_id: job.id,
        name: '',
        email: '',
        resume: null,
        cover_letter: '',
    });

    const submit = (e) => {
        e.preventDefault();
        Swal.fire({
            icon: 'question',
            title: "Do you want to submit?",
            showCancelButton: true,
            confirmButtonText: "Yes, Save it",
            confirmButtonColor:'#F97316'
        }).then((result) => {
            if (result.isConfirmed) {
                post(route('apply.store'));
            }
        });
        
    };
    return (
       <Guest auth={auth}>
            <Head title="Apply" />
            <div className="flex flex-col md:flex-row gap-5 md:gap-8">
                <div className="w-full md:w-2/5 p-5 h-fit bg-white shadow-md rounded">
                    <div className="mb-3">
                        <div className="text-orange-600 text-xl font-semibold">{job.title}</div>
                        <div className="text-sm text-gray-500 font-light flex items-center gap-3">
                            <span className='inline-flex items-center'>
                                <IoCalendar className='mr-0.5'/>
                                {FormatDate(job.created_at)}
                            </span>
                            <span className='inline-flex items-center'>
                                <BsGeoAltFill className='mr-0.5'/>
                                {job.location}
                            </span>
                            <span className='inline-flex items-center'>
                                <GoBookmarkFill className='mr-0.5'/>
                                <span className="capitalize">{job.type}</span>
                            </span>
                        </div>
                    </div>
                    <div className="mb-3">
                        <InputLabel>Salary :</InputLabel>
                        <div className="text-gray-800 font-semibold">{FormatNumber(job.salary_min)} - {FormatNumber(job.salary_max)}</div>
                    </div>
                    <div className="mb-3">
                        <InputLabel>Job Desc. :</InputLabel>
                        <div className="text-gray-800 font-light text-sm text-justify">{job.description}</div>
                    </div>
                   
                </div>
                <form onSubmit={submit} className="w-full bg-white shadow-md rounde">
                    <div className="p-8">
                        <h1 className='font-bold text-orange-600 text-2xl mb-3'>Biodata Form</h1>
                        <div className="grid grid-cols-2 gap-5 mb-5">
                            <div className=''>
                                <InputLabel htmlFor="name" value="Your Name" required/>
                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="block w-full"
                                    autoComplete="name"
                                    isFocused={true}
                                    placeholder="Your Name"
                                    onChange={(e) => setData('name', e.target.value)}
                                />

                                <InputError message={errors.name} className="mt-2" />
                            </div>
                            <div className=''>
                                <InputLabel htmlFor="email" value="Email Address" required/>
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="block w-full"
                                    autoComplete="email"
                                    placeholder="Email Address"
                                    onChange={(e) => setData('email', e.target.value)}
                                />

                                <InputError message={errors.email} className="mt-2" />
                            </div>
                        </div>
                        <div className='mb-5'>
                                <InputLabel htmlFor="resume" value="Resume" required/>
                                <TextInput
                                    id="resume"
                                    type="file"
                                    name="resume"
                                    className="block w-fit shadow-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-violet-100"
                                    autoComplete="resume"
                                    placeholder="resume Address"
                                    onChange={(e) => setData('resume', e.target.files[0])}
                                />

                                <InputError message={errors.resume} className="mt-2" />
                            </div>
                        <div className=''>
                            <InputLabel htmlFor="cover_letter" value="Cover letter" required/>
                            <TextArea
                                id="cover_letter"
                                name="cover_letter"
                                value={data.cover_letter}
                                className="block w-full"
                                autoComplete="cover_letter"
                                placeholder="Cover letter"
                                onChange={(e) => setData('cover_letter', e.target.value)}
                            />

                            <InputError message={errors.cover_letter} className="mt-2" />
                        </div>
                    </div>
                    <div className="bg-gray-100 p-5 rounded-b-lg gap-3 flex justify-end items-center">
                        <Link href={route('home')}>
                            <SecondaryButton>Cancel</SecondaryButton>
                        </Link>
                        <PrimaryButton type="submit" disabled={processing}>Submit</PrimaryButton>
                    </div>
                </form>
            </div>
            {processing && (
                <Loading/>
            )}

       </Guest>
    );
}
