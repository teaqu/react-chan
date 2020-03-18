import { Thread } from "src/catalog/thread";

export interface Catalog {
    page: number;
    threads: Thread[];
}