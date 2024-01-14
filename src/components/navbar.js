import { Disclosure } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { setFocus } from "../redux/navSlice";
import { useNavigate } from "react-router-dom";

const NavBAr = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navTabActive = useSelector((state) => state.nav.navTabActive);
  const navigation = useSelector((state) => state.nav.navigation);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const handleTabClicks = (index) => {
    dispatch(setFocus(index));
    navigate(navigation[index].href);
  };

  return (
    <Disclosure as="nav" className="bg-orange-400	">
      {({ open }) => (
        <>
          <div className="mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex flex-1  sm:items-stretch sm:justify-start">
                <div className="">
                  <div className="flex space-x-4">
                    {navigation.map((item, index) => (
                      <div
                        key={item.name}
                        className={classNames(
                          navTabActive === index
                            ? "bg-zinc-700	 text-white"
                            : "text-zinc-900 hover:bg-orange-600 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium cursor-pointer	"
                        )}
                        onClick={() => handleTabClicks(index)}
                        aria-current={navTabActive ? "page" : undefined}
                      >
                        {item.name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
};

export default NavBAr;
