import Link from "next/link";

export function Header({ id }: { id: string }) {
	return (
		<div className="w-full h-32 flex justify-center items-center gap-x-8">
			<Link href="/">Home</Link>
			<Link href="/users">Users</Link>
			<Link href={`/users/${id}`}>UsersId</Link>
			<Link href={`/counters`}>Counters</Link>
		</div>
	)
}
