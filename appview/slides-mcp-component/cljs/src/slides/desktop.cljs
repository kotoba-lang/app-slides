(ns slides.desktop
  (:require [slides.ui :as ui]
            [reagent.dom :as rdom]))

(defn ^:export init! []
  (rdom/render [ui/root-view] (js/document.getElementById "app")))
