var timelinedata = {
    "timeline":
    {
        "headline":"Sh*t People Say",
        "type":"default",
		"text":"People say stuff",
		"startDate":"2012,1,26",
        "date": [
            {
                "startDate":"1928,1,1",
				"endDate":"1928,1,1",
                "headline":"cognitive framework shaped by culture environment",
                "text":"'The faculty of speech is organically determined and should be called, therefore, instinctive. However, what we speak (the form of speech) is determined solely by our environment' (3).",
                "asset":
                {
                    "media":"https://vine.co/v/b55LOA1dgJU",
                    "credit":"",
                    "caption":"Franz Boas - Anthropology and Modern Life"
                }
            },
			{
                "startDate":"2001,1,1",
                "endDate":"2001,1,1",
                "headline":"Attending holistically versus analytically: Comparing the context sensitivity of Japanese and Americans.",
                "text":"<p>With respect to differences in context, Masuda and Nisbett (2001) reported that Japanese participants were more likely, after viewing pictures of fish swimming in an underwater environment, to recall contextual details than were Americans. They also found that when participants encoded pictures of wildlife against a complex natural background (e.g. a goat on a grassy meadow), Japanese participants’ recognition performance was more negatively affected by background changes than were Americans.  </p>",
                "asset":
                {
                    "media":"",
                    "credit":"",
                    "caption":"cognitive framework shaped by culture environment"
                }
            }
        ]
    }
}

createStoryJS({
  type:       'timeline',
  width:      '100%',
  height:     '600',
  start_zoom_adjust:  2,
  source:     timelinedata,
  embed_id:   'visualization'
});