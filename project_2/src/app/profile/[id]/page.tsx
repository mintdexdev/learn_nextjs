async function UserProfile({ params }: { params: any }) {
  const { id } = await params;
  return (
    <div className=" h-fit min-w-full sm:min-w-[20rem] p-4 rounded-2xl flex flex-col  bg-neutral-100 text-black">
      <h1 className='text-3xl font-semibold text-center '>User Profile</h1>
      <h2 className="my-2 px-4 py-2 rounded bg-blue-300">{id}</h2>
    </div>
  )
}

export default UserProfile