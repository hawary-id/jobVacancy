import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

export default function Guest({ auth=null,children,flashMessage=null }) {
    useEffect(() => {
        if(flashMessage!=null && flashMessage.message){
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
              });
              Toast.fire({
                icon: flashMessage.type,
                title: flashMessage.message
              });
        }
    },[flashMessage])
    return (
        <div className="relative flex flex-col justify-between w-full min-h-screen bg-gray-50">
             <header className="sticky top-0 z-50 w-full px-3 bg-white shadow md:px-0">
                    <div className="container flex justify-between py-2 mx-auto">
                        <Link href="/" className="flex lg:justify-center lg:col-start-2">
                            <ApplicationLogo/>
                        </Link>
                        <nav className="flex justify-end flex-1 gap-3">
                            {auth?.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] "
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <Link
                                    href={route('login')}
                                    className="rounded-md py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] "
                                >
                                    Log in
                                </Link>
                            )}
                        </nav>
                    </div>
                </header>

            <main className="container w-full px-3 mx-auto my-4 overflow-hidden md:my-10 grow md:px-0">
                {children}
            </main>

            <footer className="py-3 text-sm font-light text-center text-gray-600 bg-white">
                Copyright
            </footer>
        </div>
    );
}
