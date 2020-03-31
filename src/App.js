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
	<div className="px-8 pt-12 pb-6">
		<h1 id="smileys-and-emotion" className="font-semibold text-base tracking-widest uppercase text-gray-500">
			<a href="#smileys-and-emotion">
				<span className="emoji">{emoji}</span>{"\u00a0".repeat(2)}
				{props.children}
			</a>
		</h1>
	</div>
)

// TODO: Add hover / focus animations (bounce)
const Grid = React.memo(({ emojis, ...props }) => (
	<div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10">
		{emojis.map(each => (
			// TODO: Animate-in background circle
			<div key={each.codePoints.join("-")} className="pb-1/1 relative hover:bg-gray-200 rounded-full transition duration-150">
				<div className="absolute inset-0">

					{/* Emoji */}
					<div className="p-1 absolute inset-0 flex flex-row justify-center items-center pointer-events-none z-10">
						<p className="pointer-events-auto" style={{ fontSize: "3em", fontFamily: "'Apple Color Emoji'" }}>
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
			<div className="px-6 w-full max-w-screen-lg">

				{/* Search */}
				{/**/}
				{/* TODO: Add hover / focus animations (bounce) */}
				<div className="-mt-8 pt-8 sticky top-0 bg-white z-40">
					<div className="px-8 h-16 bg-white rounded-lg shadow-hero-lg overflow-none">
						<input className="w-full h-full text-2xl bg-transparent outline-none" type="text" placeholder={`🔍${" ".repeat(4)}Search up to ${relevant.length} emojis (Unicode 12.0)`} value={search} onChange={e => setSearch(e.target.value)} spellCheck={false} />
					</div>
				</div>

				{/* Grid */}
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

