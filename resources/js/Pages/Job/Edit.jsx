import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import Select from '@/Components/Select';
import TextArea from '@/Components/TextArea';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { LOCATION_DATA, TYPE_JOB_DATA } from '@/Utils/Constant';
import { Head, Link, useForm } from '@inertiajs/react';
import Swal from 'sweetalert2';

export default function Create({ auth,job }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        title: job.title,
        description: job.description,
        location: job.location,
        type: job.type,
        salary_min: job.salary_min,
        salary_max: job.salary_max,
    });

    const locationOptions = LOCATION_DATA.map((item) => ({
        value: item.value,
        label: item.label
    }))

    const typeOptions = TYPE_JOB_DATA.map((item) => ({
        value: item.value,
        label: item.label
    }))

    const submit = (e) => {
        e.preventDefault();
        Swal.fire({
            icon: 'question',
            title: "Do you want to save the changes?",
            showCancelButton: true,
            confirmButtonText: "Yes, Save it",
            confirmButtonColor:'#F97316'
        }).then((result) => {
            if (result.isConfirmed) {
                put(route("job.update", job.id));
            }
        });
        
    };
    
    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Create New Job" />

            <div className="px-5 py-12">
                <form onSubmit={submit} className="w-full md:w-1/2 mx-auto shadow-sm rounded-lg">
                    <div className="bg-white p-5 rounded-t-lg">
                        <h1 className='mb-5'>Edit Job : <span className='text-orange-600 font-semibold'>{job.title}</span></h1>
                        <div className='mb-5'>
                            <InputLabel htmlFor="title" value="Title" required/>
                            <TextInput
                                id="title"
                                name="title"
                                value={data.title}
                                className="block w-full"
                                autoComplete="title"
                                isFocused={true}
                                placeholder="Title"
                                onChange={(e) => setData('title', e.target.value)}
                            />

                            <InputError message={errors.title} className="mt-2" />
                        </div>

                        <div className='mb-5'>
                            <InputLabel htmlFor="location" value="Location" required/>
                            <Select
                                options={locationOptions}
                                isClearable   
                                placeholder="Select Location"
                                value={locationOptions.find(option => option.value === data.location)}
                                onChange={selectedOption => setData('location', selectedOption ? selectedOption.value : '')}
                            />
                            <InputError message={errors.location} className="mt-2" />
                        </div>

                        <div className='mb-5'>
                            <InputLabel htmlFor="type" value="Type" required/>
                            <Select
                                options={typeOptions}
                                isClearable    
                                placeholder="Select Type" 
                                value={typeOptions.find(option => option.value === data.type)}
                                onChange={selectedOption => setData('type', selectedOption ? selectedOption.value : '')}
                            />
                            <InputError message={errors.type} className="mt-2" />
                        </div>

                        <div className='mb-5 grid grid-cols-1 md:grid-cols-2 gap-5'>
                            <div className="">
                                <InputLabel htmlFor="salary_min" value="Salary Min"/>
                                <TextInput
                                    id="salary_min"
                                    name="salary_min"
                                    value={data.salary_min}
                                    className="block w-full"
                                    autoComplete="salary_min"
                                    placeholder="salary Min"
                                    onChange={(e) => setData('salary_min', e.target.value)}
                                />

                                <InputError message={errors.salary_min} className="mt-2" />
                            </div>
                            <div className="">
                                <InputLabel htmlFor="salary_max" value="Salary Max"/>
                                <TextInput
                                    id="salary_max"
                                    name="salary_max"
                                    value={data.salary_max}
                                    className="block w-full"
                                    autoComplete="salary_max"
                                    placeholder="salary Max"
                                    onChange={(e) => setData('salary_max', e.target.value)}
                                />

                                <InputError message={errors.salary_max} className="mt-2" />
                            </div>
                        </div>

                        <div className='mb-5'>
                            <InputLabel htmlFor="description" value="description" required/>

                            <TextArea
                                id="description"
                                name="description"
                                value={data.description}
                                className="block w-full"
                                autoComplete="description"
                                placeholder="Description"
                                onChange={(e) => setData('description', e.target.value)}
                            />

                            <InputError message={errors.description} className="mt-2" />
                        </div>
                    </div>
                    <div className="bg-gray-100 p-5 rounded-b-lg gap-3 flex justify-end items-center">
                        <Link href={route('job.index')}>
                            <SecondaryButton>Cancel</SecondaryButton>
                        </Link>
                        <PrimaryButton type="submit" disabled={processing}>Save</PrimaryButton>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
