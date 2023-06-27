Next:
quien instancia las distintas entities?

refactor all the events logic.. check for event.. 
extract to events service? leav app component as an orchetrator only

change this._updateLayers(currentEvents); into a switchmap of events$

create clock ui component

remove static variables and use subject.value instead (currentScenario...)

replace arrays with maps in some cases?

move observables declarations logic to contructor on app component

Features:
popup and modal generic components with content projection
color theme

from course - all human events
layer with non-human events - climatic, geologic, etc...

layers should have start and end date



hacer todo de nuevo en React - parece más adecuado para el entity - component pattern
el component de angular le agrega mucho overhead a lo que sería una simple clase como Map



done
- sources --> keep track of sources used for the scenario or for a specific event.