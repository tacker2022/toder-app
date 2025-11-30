"use client";

import { Search, Filter } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function MemberSearch({ companies }: { companies: string[] }) {
    const searchParams = useSearchParams();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set("query", term);
        } else {
            params.delete("query");
        }
        replace(`/admin/members?${params.toString()}`);
    }, 300);

    const handleFilter = (company: string) => {
        const params = new URLSearchParams(searchParams);
        if (company && company !== "all") {
            params.set("company", company);
        } else {
            params.delete("company");
        }
        replace(`/admin/members?${params.toString()}`);
    };

    return (
        <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={20} />
                <input
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]"
                    placeholder="İsim ile ara..."
                    onChange={(e) => handleSearch(e.target.value)}
                    defaultValue={searchParams.get("query")?.toString()}
                />
            </div>

            <div className="relative w-full md:w-64">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={20} />
                <select
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] appearance-none cursor-pointer"
                    onChange={(e) => handleFilter(e.target.value)}
                    defaultValue={searchParams.get("company")?.toString()}
                >
                    <option value="all">Tüm Firmalar</option>
                    {companies.map((company) => (
                        <option key={company} value={company}>
                            {company}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
