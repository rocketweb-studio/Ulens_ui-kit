import type { SVGProps } from "react";
import { Ref, forwardRef, memo } from "react";
const SvgIconPlusCircle = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="currentColor" ref={ref} {...props}><g clipPath="url(#Icon-plus-circle_svg__a)"><path fill="currentColor" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20m3 11h-2v2a1 1 0 0 1-2 0v-2H9a1 1 0 0 1 0-2h2V9a1 1 0 0 1 2 0v2h2a1 1 0 0 1 0 2" /></g><defs><clipPath id="Icon-plus-circle_svg__a"><path fill="currentColor" d="M0 0h24v24H0z" /></clipPath></defs></svg>;
const ForwardRef = forwardRef(SvgIconPlusCircle);
const Memo = memo(ForwardRef);
export default Memo;