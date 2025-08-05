import {useState} from "react"



export function CL(){
    const [mode,setMode] = useState("");
    const [ans,setAns] = useState("");

    

    const answers = ["Barcelona", "Real Madrid" , "Celtic" , "Bayern", "Chelsea" ,
        "Manchester city" , "Manchester United" , "Aston villa" , "Nottingham Forest",
        "Liverpool", "Inter" , "Milan" , "Juventus" , "Borussia Dortmund", "Ajax","PSV",
        "Feyenoord" , "Benfica" , "Porto" , "Hamburger", "Steaua", "Red Star", "PSG" , "Marseille"
    ]

    const hardMode = {
        1956 : "Real Madrid",
        1957 : "Real Madrid",
        1958 : "Real Madrid",
        1959 : "Real Madrid",
        1960 : "Real Madrid",
        1961 : "Benfica",
        1962 : "Benfica",
        1963 : "Milan",
        1964 : "Inter",
        1965 : "Inter",
        1966 : "Real Madrid",
        1967 : "Celtic",
        1968 : "Manchester United",
        1969 : "Milan"
        1970 : "Feyernoord",
        1971 : "Ajax",
        1972 : "Ajax",
        1973 : "Ajax",
        1974 : "Bayern",
        1975 : "Bayern",
        1976 : "Bayern",
        1977 : "Liverpool",
        1978 : "Liverpool",
        1979 : "Nottingham Forest",
        1980 : "Nottingham Forest",
        1981 : "Liverpool",
        1982 : "Aston Villa",
        1983 : "Hamburger",
        1984 : "Liverpool",
        1985 : "Juventus",
        1986 : "Steaua",
        1987 : "Porto",
        1988 : "PSV",
        1989 : "Milan",
        1990 : "Milan",
        1991 : "Red Star",
        1992 : "Barcelona",
        1993 : "Marseille",
        1994 : "Milan",
        1995 : "Ajax",
        1996 : "Juventus",
        1997 : "Borussia Dortmund"
        1998 : "Real Madrid",
        1999 : "Manchester United",
        2000 : "Real Madrid",
        2001 : "Bayern",
        2002 : "Real Madrid",
        2003 : "Milan",
        2004 : "Porto",
        2005 : "Liverpool",
        2006 : "Barcelona",
        2007 : "Milan",
        2008 : "Manchester United",
        2009 : "Barcelona",
        2010 : "Inter",
        2011 : "Barcelona",
        2012 : "Chelsea",
        2013 : "Bayern",
        2014 : "Real Madrid",
        2015 : "Barcelona",
        2016 : "Real Madrid",
        2017 : "Real Madrid",
        2018 : "Real Madrid",
        2019 : "Liverpool",
        2020 : "Bayern",
        2021 : "Chelsea",
        2022 : "Real Madrid",
        2023 : "Manchester City",
        2024 : "Real Madrid",
        2025 : "PSG"

    }

}