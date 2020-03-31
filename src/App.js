import React from "react"
import $dataset from "./UNICODE_13-0_DO-NOT-EDIT.generated.json"

// TODO: Precompute
const components = $dataset
	.filter(each => each.status === "component")
	.map(each => each.codePoints[0]) // Assumes component emojis are one code point

// TODO: Precompute
const relevant = $dataset
	// .slice(0, 32)
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

const App = props => {
	const [query, setQuery] = React.useState("")

	return (
		<div className="py-32 flex flex-row justify-center" style={{ fontFamily: "'BlinkMacSystemFont', 'Apple Color Emoji'" }}>
			<div className="px-6 w-full max-w-screen-lg">

				{/* Search */}
				<div className="-mt-8 pt-8 sticky top-0 z-40">
					<div className="px-6 h-16 bg-white rounded-lg shadow-hero-lg overflow-none">
						<input className="w-full h-full bg-transparent outline-none" type="text" value={query} onChange={e => setQuery(e.target.value)} />
					</div>
				</div>

				{/* Grid */}
				<div className="h-8" />
				<div className="grid grid-cols-8 gap-3">
					{relevant.map(each => (
						<div key={each.codePoints.join("-")} className="pb-1/1 relative">
							<div className="absolute inset-0">
								<div className="flex flex-row justify-center items-center h-full">
									<span style={{ fontSize: "3.25em" }} data-description={each.description}>
										{each.emoji}
									</span>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default App
