import Image from "next/image";

export type Person = {
  name: string;
  role: string;
  phone: string;
  email: string;
};

export function PersonCard({ person, photo }: { person: Person; photo: string }) {
  return (
    <div className="bg-white border border-zinc-200 flex flex-col items-center text-center">
      <div className="relative aspect-[3/4] w-[72%] mt-6 bg-zinc-200">
        <Image
          src={photo}
          alt={person.name}
          fill
          className="object-cover object-top"
          sizes="(max-width: 640px) 72vw, (max-width: 1024px) 36vw, 24vw"
        />
      </div>
      <div className="p-6 flex flex-col items-center">
        <h3 className="text-lg font-semibold text-zinc-900 font-[family-name:var(--font-display)]">
          {person.name}
        </h3>
        <p className="mt-1 text-sm text-zinc-600">{person.role}</p>
        <div className="mt-3 flex flex-col items-center gap-1">
          <a
            href={`tel:${person.phone.replace(/\s/g, "")}`}
            className="text-sm text-zinc-600 hover:text-ember transition-colors font-[family-name:var(--font-mono)]"
          >
            {person.phone}
          </a>
          <a
            href={`mailto:${person.email}`}
            className="text-sm text-zinc-600 hover:text-ember transition-colors"
          >
            {person.email}
          </a>
        </div>
      </div>
    </div>
  );
}
