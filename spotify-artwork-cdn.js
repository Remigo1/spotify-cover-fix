(function spotifyArtworkFallback() {
    "use strict";
    const artworkUrls = /https?:\/\/(?:i\.scdn\.co|image-cdn-(?:ak|fa)\.spotifycdn\.com)\/image\//g;
    function rewriteArtwork(value) {
        if (typeof value !== "string") return value;
        return value
            .replace(artworkUrls, destination)
            .replace(/spotify:image:([a-f0-9]+)/g, (_, id) => destination + id);
    }
    const destination = "https://image-cdn-fa.spotifycdn.com/image/";

    // Fullscreen preloads artwork in detached Image objects before rendering it.
    const imageSource = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, "src");
    if (imageSource && imageSource.get && imageSource.set && imageSource.configurable) {
        Object.defineProperty(HTMLImageElement.prototype, "src", {
            ...imageSource,
            set(value) {
                const rewritten = rewriteArtwork(value);
                imageSource.set.call(this, rewritten);
            }
        });
    }
    function updateImage(image) {
        for (const attribute of ["src", "srcset", "style"]) {
            const value = image.getAttribute(attribute);
            if (value && rewriteArtwork(value) !== value) {
                image.setAttribute(attribute, rewriteArtwork(value));
            }
        }
    }

    function scan(node) {
        if (!(node instanceof Element)) return;
        if (node.matches("img, [style]")) updateImage(node);
        node.querySelectorAll("img, [style]").forEach(updateImage);
    }

    function start() {
        scan(document.documentElement);
        new MutationObserver(records => {
            for (const record of records) {
                if (record.type === "attributes") {
                    updateImage(record.target);
                } else {
                    record.addedNodes.forEach(scan);
                }
            }
        }).observe(document.documentElement, {
            subtree: true,
            childList: true,
            attributes: true,
            attributeFilter: ["src", "srcset", "style"]
        });
    }

    if (document.documentElement) start();
    else document.addEventListener("DOMContentLoaded", start, { once: true });
})();
