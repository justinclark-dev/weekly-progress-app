|	HTTP Method	|	Path/Endpoint	|	CRUD Operation	|	Route Name	|	Description	|
|   ----------- |   -------------   |   --------------  |   ----------  |   ----------- |
|	GET	|	/week-report	|	read	|	index	|	Display a list of all of reports for all weeks.	|
|	GET	|	/week-report/new	|	read	|	new	|	Show a form to add start a new week's report.	|
|	POST	|	/week-report	|	create	|	create	|	Add a new week's report.	|
|	GET	|	/week-report/:weekNum	|	read	|	show	|	Display a specific week's report.	|
|	GET	|	/week-report/:weekNum/edit	|	read	|	edit	|	Show a form to edit an existing week's report.	|
|	PUT	|	/week-report/:weekNum	|	update	|	update	|	Update a specific week's report.	|
|	DELETE	|	/week-report/:weekNum	|	delete	|	delete	|	Remove a specific week's report from the list.	|