sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"authorslistview/test/integration/pages/AuthorsList",
	"authorslistview/test/integration/pages/AuthorsObjectPage"
], function (JourneyRunner, AuthorsList, AuthorsObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('authorslistview') + '/test/flpSandbox.html#authorslistview-tile',
        pages: {
			onTheAuthorsList: AuthorsList,
			onTheAuthorsObjectPage: AuthorsObjectPage
        },
        async: true
    });

    return runner;
});

