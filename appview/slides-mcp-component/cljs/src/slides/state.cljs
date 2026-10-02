(ns slides.state
  (:require [reagent.core :as reagent]))

;; Static app descriptor (port of the `app` object in +page.svelte).
(def app-info
  {:title "Slides Mcp Component"
   :project "etzhayyim-project-slides"
   :name "slides-mcp-component"
   :kind "appview"
   :route-count 0
   :routes []
   :vars []
   :xrpc true
   :relative-path "60-apps/etzhayyim-project-slides/appview/slides-mcp-component/svelte/src/routes/+page.svelte"})
