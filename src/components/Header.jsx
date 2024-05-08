import Link from "next/link";

export default function Header() {
    return (
        <div className="mx-auto w-full">
            <div className="shadow-lg bg-gray-950 flex justify-between items-center px-8 py-3 ">
                <div className="">
                    <Link href={'/create'} className="text-white hover:text-orange-500 active:text-gray-900 text-2xl font-semibold">Task Mangement</Link>
                </div>
                <div>
                    <ul className="flex justify-between items-center gap-8">
                        <li>
                            <Link href={'/create'} className="text-white hover:text-orange-500 active:text-gray-900 text-md font-semibold">Create Task</Link>
                        </li>
                        <li>
                            <Link href={'/'} className="text-white hover:text-orange-500 active:text-gray-900 text-md font-semibold">Read Task</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
