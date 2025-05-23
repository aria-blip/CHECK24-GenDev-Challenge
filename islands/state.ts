import { useSignal ,Signal,signal} from "@preact/signals";
import { Product } from "./product.ts";
// this is used to share states across different files
export const listofdata: Signal<Product[]> = signal([]);
export const pagenum:number = 0