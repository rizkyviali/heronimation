import type { PropDef } from "@/lib/registry";

interface PropsTableProps {
  props: PropDef[];
}

export default function PropsTable({ props }: PropsTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-800">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-zinc-800 bg-zinc-900">
            <th className="px-4 py-3 text-left font-semibold text-zinc-300">
              Prop
            </th>
            <th className="px-4 py-3 text-left font-semibold text-zinc-300">
              Type
            </th>
            <th className="px-4 py-3 text-left font-semibold text-zinc-300">
              Required
            </th>
            <th className="px-4 py-3 text-left font-semibold text-zinc-300">
              Default
            </th>
            <th className="px-4 py-3 text-left font-semibold text-zinc-300">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop, i) => (
            <tr
              key={prop.name}
              className={`border-b border-zinc-800 last:border-0 ${i % 2 === 0 ? "bg-zinc-950" : "bg-zinc-900/40"}`}
            >
              <td className="px-4 py-3 font-mono text-lime-400">{prop.name}</td>
              <td className="px-4 py-3 font-mono text-zinc-400 text-xs">
                {prop.type}
              </td>
              <td className="px-4 py-3">
                {prop.required ? (
                  <span className="text-orange-400 font-medium">Yes</span>
                ) : (
                  <span className="text-zinc-600">No</span>
                )}
              </td>
              <td className="px-4 py-3 font-mono text-zinc-500 text-xs">
                {prop.default ?? "—"}
              </td>
              <td className="px-4 py-3 text-zinc-400">{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
