import React from "react"
import $dataset from "./UNICODE_13-0_DO-NOT-EDIT.generated.json"

// TODO: Precompute
const components = $dataset
	.filter(each => each.status === "component")
	.map(each => each.codePoints[0]) // Assumes component emojis are one code point

// TODO: Precompute
const relevant = $dataset
	.slice(0, 32)
	.filter(each => {
		// Status:
		if (each.status !== "fully-qualified") {
			return false
		}
		// Version:
		const { tag } = each
		const version = +tag.slice(1) // Coerce to a number
		// Minimum supported version:
		if (version >= 12) {
			return false
		}
		// Component:
		const { codePoints } = each
		const hasComponent = codePoints.some(codePoint => components.includes(codePoint))
		if (hasComponent) {
			return false
		}
		return true
	})

const Section = ({ emoji, ...props }) => (
	<div className="px-6 pt-12 pb-6">
		<p id="smileys-and-emotion" className="font-bold uppercase text-sm tracking-wider text-gray-500">
			<a href="#smileys-and-emotion">
				<span className="emoji-sm">{emoji}</span>{"\u00a0".repeat(2)}
				{props.children}
			</a>
		</p>
	</div>
)

// TODO: Add hover / focus animations (bounce)
const Grid = React.memo(({ emojis, ...props }) => (
	<div className="grid grid-cols-6 sm:grid-cols-7 md:grid-cols-8">
		{emojis.map(each => (
			// TODO: Animate-in background circle
			<div key={each.codePoints.join("-")} className="pb-1/1 relative hover:bg-blue-100 rounded-xl transition duration-150">
				<div className="absolute inset-0">

					{/* Emoji */}
					<div className="p-1 absolute inset-0 flex flex-row justify-center items-center pointer-events-none z-10">
						<p className="-mb-1 pointer-events-auto" style={{ fontSize: "3em", /* lineHeight: 1, */ fontFamily: "'Apple Color Emoji'" }}>
							{each.emoji}
						</p>
					</div>

					{/* Description */}
					{/* <div className="p-1 absolute inset-0 flex flex-row justify-center items-end"> */}
					{/* 	<p className="text-center text-xs leading-snug truncate text-gray-600"> */}
					{/* 		{each.description} */}
					{/* 	</p> */}
					{/* </div> */}

				</div>
			</div>
		))}
	</div>
))

const App = props => {
	const [search, setSearch] = React.useState("")
	const [emojis, setEmojis] = React.useState(() => relevant)

	React.useEffect(() => {
		const id = setTimeout(() => {
			const emojis = relevant.filter(each => (
				each.description.toLowerCase().includes(search.toLowerCase())) || // Word search
				each.emoji === search // Emoji search
			)
			setEmojis(emojis)
		}, 25)
		return () => {
			clearTimeout(id)
		}
	}, [search])

	return (
		<div className="py-32 flex flex-row justify-center">
			<div className="px-6 w-full max-w-screen-md">

				<div className="h-48 flex flex-row justify-center items-center">
					<h1 className="text-center font-semibold text-5xl tracking-tight" style={{ fontFamily: "'Poppins'" }}>
						emoji database{" "}
						<span className="emoji-lg">😂</span>
					</h1>
				</div>

				{/* Search */}
				{/**/}
				{/* TODO: Add hover / focus animations (bounce) */}
				<div className="!-mt-8 pt-8 sticky top-0 bg-white z-40">
					{/* <div className="px-8 h-16 bg-white rounded-lg-xl shadow-hero-lg overflow-none"> */}
					<div className="px-8 bg-white rounded-lg-xl shadow-hero-lg overflow-none" style={{ height: "4.5rem" }}>
						<input className="w-full h-full text-2xl bg-transparent outline-none" type="text" placeholder={`🔍${" ".repeat(2)}Search up to ${relevant.length} emojis (Unicode 12.0)`} value={search} onChange={e => setSearch(e.target.value)} spellCheck={false} />
					</div>
				</div>

				<Section emoji="🕘">
					Frequently Used
				</Section>
				<Grid emojis={emojis} />

				<Section emoji="😀">
					Smileys & Emotion
				</Section>
				<Grid emojis={emojis} />

				{/* <Section emoji="👤"> */}
				{/* 	People & Body */}
				{/* </Section> */}
				{/* <Grid emojis={emojis} /> */}

				{/* <Section emoji="🏽"> */}
				{/* 	Component */}
				{/* </Section> */}
				{/* <Grid emojis={emojis} /> */}

				<Section emoji="🐻">
					Animals & Nature
				</Section>
				<Grid emojis={emojis} />

				<Section emoji="🍔">
					Food & Drink
				</Section>
				<Grid emojis={emojis} />

				<Section emoji="🚘">
					Travel & Places
				</Section>
				<Grid emojis={emojis} />

				<Section emoji="⚽">
					Activities
				</Section>
				<Grid emojis={emojis} />

				<Section emoji="💡">
					Objects
				</Section>
				<Grid emojis={emojis} />

				<Section emoji="🔣">
					Symbols
				</Section>
				<Grid emojis={emojis} />

				<Section emoji="🏳️">
					Flags
				</Section>
				<Grid emojis={emojis} />

			</div>
		</div>
	)
}

export default App

