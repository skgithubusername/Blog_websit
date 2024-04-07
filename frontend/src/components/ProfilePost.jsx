import {IF} from '../url'

const ProfilePost = ({p}) => {
  return (
    <div className="w-full flex mt-20 space-x-6">
    {/* left */}


<div className="w-[35%] md:w-[45%] h-[200px] md:h-[450px] flex justify-center items-center">
      <img src={IF+p.photo} alt="error" className="h-full w-full object-cover" />
    </div>
    {/* right */}

    <div className="flex-col w-[65%] ">
      <h1 className="text-xl font-bold md:mb:-2 mb-1 md:text-2x1">
        {p.title}
      </h1>
      <div className="flex mb-2 text-sm font-semibold test-gray-500 space-x-4 md:mb-4">
        <p>@{p.username}</p>
        <div className="flex space-x-2">
        <p>{new Date(p.updatedAt).toString().slice(0, 15)}</p>
              <p>{new Date(p.updatedAt).toString().slice(16, 24)}</p>
        </div>
      </div>
      <p className="text-sm md:text-lg">{p.desc} </p>
    </div>
  </div>
  )
}

export default ProfilePost


