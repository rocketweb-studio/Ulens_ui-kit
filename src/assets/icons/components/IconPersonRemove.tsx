import type { SVGProps } from "react";
import { Ref, forwardRef, memo } from "react";
const SvgIconPersonRemove = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="currentColor" ref={ref} {...props}><g fill="currentColor" clipPath="url(#Icon-person-remove_svg__a)"><path d="M21 6h-4a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M16 21a1 1 0 0 0 1-1 7 7 0 1 0-14 0 1 1 0 0 0 1 1" /></g><defs><clipPath id="Icon-person-remove_svg__a"><path fill="currentColor" d="M0 0h24v24H0z" /></clipPath></defs></svg>;
const ForwardRef = forwardRef(SvgIconPersonRemove);
const Memo = memo(ForwardRef);
export default Memo;