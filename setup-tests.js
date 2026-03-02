// Try to set up a DOM environment using happy-dom. We try multiple fallbacks
// so tests don't crash if a specific export name isn't present.
// Use top-level await so the test runner waits for globals to be established.
// 1) Try to import the top-level 'happy-dom' package and create a Window.
try {
	const happy = await import("happy-dom");
	const { Window } = happy;
	if (Window) {
		const win = new Window();
		globalThis.window = win;
		globalThis.document = win.document;
		globalThis.HTMLElement = win.HTMLElement;
		globalThis.navigator = win.navigator;
		globalThis.getComputedStyle = win.getComputedStyle.bind(win);
		globalThis.requestAnimationFrame = win.requestAnimationFrame.bind(win);
		globalThis.cancelAnimationFrame = win.cancelAnimationFrame.bind(win);
	}
} catch (e) {
	// continue to next fallback
}

// 2) Try the registrar export (two possible spellings) that some setups use.
try {
	const mod = await import("@happy-dom/global-registrar");
	mod?.GlobalRegistrator?.register?.();
} catch (e) {
	try {
		const mod2 = await import("@happy-dom/global-registrator");
		mod2?.GlobalRegistrator?.register?.();
	} catch (err) {
		// final fallback: no-op — tests may still run if the environment is provided by the test runner
	}
}