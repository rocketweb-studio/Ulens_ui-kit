import type { SVGProps } from "react";
import { Ref, forwardRef, memo } from "react";
const SvgIconMenuOutline = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="currentColor" ref={ref} {...props}><g fill="currentColor" clipPath="url(#Icon-menu-outline_svg__a)"><path d="M20.05 11H3.95a.95.95 0 0 0-.95.95v.1c0 .525.425.95.95.95h16.1a.95.95 0 0 0 .95-.95v-.1a.95.95 0 0 0-.95-.95M20.05 16H3.95a.95.95 0 0 0-.95.95v.1c0 .525.425.95.95.95h16.1a.95.95 0 0 0 .95-.95v-.1a.95.95 0 0 0-.95-.95M20.05 6H3.95a.95.95 0 0 0-.95.95v.1c0 .525.425.95.95.95h16.1a.95.95 0 0 0 .95-.95v-.1a.95.95 0 0 0-.95-.95" /></g><defs><clipPath id="Icon-menu-outline_svg__a"><path fill="currentColor" d="M0 0h24v24H0z" /></clipPath></defs></svg>;
const ForwardRef = forwardRef(SvgIconMenuOutline);
const Memo = memo(ForwardRef);
export default Memo;