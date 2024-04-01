const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full h-16 z-40">
      <div className="flex justify-end items-center h-full space-x-4">
        <p>Dimas Pramudya</p>
        <button className="px-4 text-red-400 hover:text-red-500">Logout</button>
      </div>
    </nav>
  )
}

export default Navbar