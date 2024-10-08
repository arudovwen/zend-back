// components/CustomNav.tsx

import Link from "next/link";

interface LinkItem {
  title: string;
  url: string;
}

interface CustomNavProps {
  className?: string;
  links?:any;
}

const CustomNav: React.FC<CustomNavProps> = ({
  className = "text-secondary/60 dark:text-white/50 last:text-secondary/80 last:dark:text-white/70",
  links = [{ title: "home", url: "/" }],
}) => {
  return (
    <div>
      <ul className={`flex gap-x-2`}>
        {links.map((link:any, idx:any) => (
          <li
            key={idx}
            className={`text-[#475467] ${className} ${link.title && `after:content-['>']`}  font-normal last:font-medium text-[11px] sm:text-xs lg:text-[13px] capitalize  last:after:content-[''] flex gap-x-[6px] items-center `}
          >
            <Link href={link.url}>
              <span className={`text-secondary/60 dark:text-white/50 last:text-secondary/80 last:dark:text-white/70`}>{link.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomNav;
