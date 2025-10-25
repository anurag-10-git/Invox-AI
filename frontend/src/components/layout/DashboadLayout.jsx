import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext";
import { Briefcase, LogOut, Menu, X } from "lucide-react";
import { NAVIGATION_MENU } from "../../utils/data";
import ProfileDropdown from "./ProfileDropdown";

const NavigationItem = ({ item, isActive, onClick, isCollapsed }) => {
  const Icon = item.icon;

  return <button
    onClick={() => onClick(item.id)}
    className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 group
      ${isActive ? "bg-blue-50 text-blue-900 shadow-sm shadow-blue-50" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}
      `}
  >
    <Icon className={`h-5 w-5 flex-shrink-0 ${isActive ? "text-blue-900" : "text-gray-500"
      }`} />
    {!isCollapsed && <span className="ml-3 truncate">{item.name}</span>}
  </button>
}

const DashboadLayout = ({ children, acitveMenu }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate()

  const [sidebarOpen, setSideBarOpen] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState(acitveMenu || "dashboard");
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setSideBarOpen(false);
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener(("resize"), handleResize)
    }
  }, [])

  useEffect(() => {
    const handleClickOutside = () => {
      if (profileDropdownOpen) {
        setProfileDropdownOpen(false);
      }
    }

    document.addEventListener("click", handleClickOutside)

    return () => document.removeEventListener("click", handleClickOutside);
  }, [profileDropdownOpen])

  const handleNavigation = (itemId) => {
    setActiveNavItem(itemId);
    navigate(`/${itemId}`);
    if (isMobile) {
      setSideBarOpen(false);
    }
  }

  const toggleSidebar = () => {
    setSideBarOpen(prev => !prev);
  }

  const sidebarCollapsed = !isMobile && false;
  return (
    <div className="flex h-screen bg-gray-50">
      <div className={`fixed inset-y-0 left-0 z-50 transition-transform duration-300 tranform
        ${isMobile ? (sidebarOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0"}
        ${sidebarCollapsed ? "w-16" : "w-64"}
         bg-white border-r border-gray-200`}>
        <div className="flex items-center h-16 border-b border-gray-200 px-6">
          <Link className="flex items-center space-x-3" to="/">
            <div className="h-8 w-8 bg-gradient-to-br from-blue-900 to-blue-700  rounded-lg flex items-center justify-center">
              <Briefcase className="h-5 w-5 text-white" />
            </div>
            {!sidebarCollapsed && <span className="text-gray-900 font-bold text-xl">Invox AI</span>}
          </Link>
        </div>

        <nav className="p-4 space-y-2">
          {NAVIGATION_MENU.map(item => (
            <NavigationItem
              key={item.id}
              item={item}
              isActive={activeNavItem === item.id}
              onClick={handleNavigation}
              isCollapsed={sidebarCollapsed}
            />
          ))}
        </nav>

        <div className="absolute bottom-4 left-4 right-4" >
          <button className="w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200" onClick={logout}>
            <LogOut className="h-5 w-5 flex-shink-0 text-gray-500" />
            {!sidebarCollapsed && <span className="ml-3">Logout</span>}
          </button>
        </div>
      </div>

      {isMobile && sidebarOpen && (
        <div className="fixed inset-0 bg-black/10 bg-opacity-25 z-40 backdrop-blur-sm" onClick={() => setSideBarOpen(false)} />
      )}

      <div className={`flex-1 flex flex-col transition-all duration-300 ${isMobile ? "ml-0" : sidebarCollapsed ? "ml-16" : "ml-64"}`}>
        <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 h-16 flex items-center justify-between px-6 sticky top-0 z-30">
          <div className="flex items-center space-x-4">
            {isMobile && (
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-xl hover:bg-gray-100 transition-colors duration-200"
              >
                {sidebarOpen ? (
                  <X className="h-5 w-5 text-gray-600" />
                ) :
                  (
                    <Menu className="h-5 w-5 text-gray-600" />
                  )}
              </button>
            )}
            <div>
              <h1 className="text-base font-semibold text-gray-900">
                Welcome back, {user?.name}
              </h1>
              <p className="text-sm text-gray-500 hidden sm:block">
                Here's your invoice overview.
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <ProfileDropdown
              isOpen={profileDropdownOpen}
              onToggle={(e) => {
                e.stopPropagation();
                setProfileDropdownOpen(prev => !prev)
              }}
              avatar={user?.avatar || ""}
              companyName={user?.name || ""}
              email={user?.email || ""}
              onLogout={logout}
            />
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  )
}

export default DashboadLayout