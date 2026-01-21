const bandMembers = [
  {
    name: "Matteo Ballarin",
    role: "Chitarra e Voce",
    image: "/images/members/matteo.jpg",
    instagram: "https://www.instagram.com/teoballa/",
  },
  {
    name: "Andrea Ghion",
    role: "Basso e Voce",
    image: "/images/members/andrea.jpg",
    instagram: "https://www.instagram.com/andrea.ghion/",
  },
  {
    name: "Denis Ronchese",
    role: "Tastiere e Voce",
    image: "/images/members/denis.jpg",
    instagram: "https://www.instagram.com/denisron.keys/",
  },
  {
    name: "Manuel Smaniotto",
    role: "Batteria e Percussioni",
    image: "/images/members/manuel.jpg",
    instagram: "https://www.instagram.com/manuelsmaniotto/",
  },
];

export default function Biography() {
  return (
    <section
      id="biografia"
      className="bg-[rgb(var(--color-black-rgb))] text-[rgb(var(--color-white-rgb))]"
    >
      {/* Biography Content */}
      <div className="max-w-6xl mx-auto px-[var(--section-padding-x)] py-[var(--section-padding-y)]">
        <h2 className="text-[length:var(--section-title-size)] md:text-[length:var(--section-title-size-lg)] font-bold text-center mb-[var(--section-title-margin-bottom)] tracking-tight">
          BIOGRAFIA
        </h2>

        <p className="text-[rgb(var(--color-white-rgb))] text-[length:var(--body-text-lg)] text-center max-w-6xl mx-auto mb-[var(--bio-paragraph-margin-bottom)] leading-relaxed">
          Dal 2005 vi facciamo emozionare proponendo con grande passione le
          sonorità tipiche dei Pink Floyd a 360 gradi.
          <br />
          La scaletta abbraccia tutta la discografia, dalla psichedelia di
          Astronomy Domine ed Echoes, passando per l&apos;evoluzione degli anni
          &apos;70 (Atom Heart Mother, Dark Side of the Moon, Wish You Were
          Here, Animals e The Wall), fino al loro ultimo album in studio.
        </p>

        {/* Band Members */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[var(--bio-member-gap)] md:gap-[var(--bio-member-gap-md)]">
          {bandMembers.map((member) => (
            <div key={member.name} className="text-center">
              {/* Circular Photo Placeholder */}
              <a
                href={member.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Apri Instagram di ${member.name}`}
                className="relative mx-auto block w-20 h-20 sm:w-[var(--bio-member-photo)] sm:h-[var(--bio-member-photo)] md:w-[var(--bio-member-photo-md)] md:h-[var(--bio-member-photo-md)] mb-2 sm:mb-[var(--bio-member-photo-margin-bottom)] hover:scale-105 transition-transform duration-200 ease-out"
              >
                <span className="absolute inset-0 rounded-full border-2 sm:border-5 border-[rgb(var(--color-white-rgb))] overflow-hidden">
                  <span
                    className="block w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${member.image})` }}
                  />
                </span>
              </a>
              <h3 className="text-[rgb(var(--color-white-rgb))] font-bold text-sm sm:text-[length:var(--bio-member-name-size)] md:text-[length:var(--bio-member-name-size-md)]">
                {member.name}
              </h3>
              <p className="text-[rgb(var(--color-gray-400-rgb))] text-xs sm:text-[length:var(--bio-member-role-size)] md:text-[length:var(--bio-member-role-size-md)]">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Band Group Photo */}
      <div className="w-full h-[250px] sm:h-[var(--bio-parallax-height)] md:h-[var(--bio-parallax-height-md)] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/band-group.jpg')] bg-cover bg-[center_25%] bg-no-repeat" />
      </div>
    </section>
  );
}
