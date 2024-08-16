import { CgSpinner } from "react-icons/cg";
export default function Loading(second) {
    return(
        <div className="absolute top-0 left-0 bg-white/90 w-full h-screen flex items-center justify-center z-50">
            <CgSpinner className="animate-spin h-14 w-14 text-orange-600"/>
        </div>
    )
}