import csv
import numpy as np

dem = [1915,
        1916,
        1917,
        1918,
        1919,
        1920,
        1933,
        1934,
        1935,
        1936,
        1937,
        1938,
        1939,
        1940,
        1941,
        1942,
        1943,
        1944,
        1945,
        1946,
        1947,
        1948,
        1949,
        1950,
        1951,
        1952,
        1961,
        1962,
        1963,
        1964,
        1965,
        1966,
        1967,
        1968,
        1977,
        1978,
        1979,
        1980,
        1993,
        1994,
        1995,
        1996,
        1997,
        1998,
        1999,
        2000,
        2009,
        2010,
        2011,
        2012,
        2013,
        2014,
        2015,
        2016
]

rep = [1921,
        1922,
        1923,
        1924,
        1925,
        1926,
        1927,
        1928,
        1929,
        1930,
        1931,
        1932,
        1953,
        1954,
        1955,
        1956,
        1957,
        1958,
        1959,
        1960,
        1969,
        1970,
        1971,
        1972,
        1973,
        1974,
        1975,
        1976,
        1981,
        1982,
        1983,
        1984,
        1985,
        1986,
        1987,
        1988,
        1989,
        1990,
        1991,
        1992,
        2001,
        2002,
        2003,
        2004,
        2005,
        2006,
        2007,
        2008,
        2017,
        2018,
        2019,
        2020
]

years = np.array([])
years2 = np.array([])
dem_years2 = np.array([])
rep_years2 = np.array([])

with open('ixic.csv', newline='') as csvfile:
    reader = csv.DictReader(csvfile)
    counter = 0
    months_sum = 0
    year_open = 0
    for row in reader:
        counter += 1
        months_sum += float(row['Adj Close'])
        if counter == 1:
            year_open = float(row['Open'])
        if (counter % 12 == 0):
            years = np.append(years, months_sum/12)
            years2 = np.append(years2, 100*( ( float(row['Close']) - year_open ) / year_open) )
            months_sum = year_open = counter = 0

    for j, y in np.ndenumerate(years2):
        if 1971+j[0] in dem:
            dem_years2 = np.append(dem_years2, y)
        elif 1971+j[0] in rep:
            rep_years2 = np.append(rep_years2, y)
    
    print("Dem Mean: ", np.mean(dem_years2))
    print("Dem Std. Dev: ", np.std(dem_years2))

    print("Rep Mean: ", np.mean(rep_years2))
    print("Rep Std. Dev: ", np.std(rep_years2))

    t = (np.mean(rep_years2)-np.mean(years2))/(np.std(rep_years2)/(rep_years2.size**0.5))

    print("t_rep =", 2*t)
    print("DoF_rep = ", rep_years2.size)

    t = (np.mean(dem_years2)-np.mean(years2))/(np.std(dem_years2)/(dem_years2.size**0.5))

    print("t_dem =", 2*t)
    print("DoF_dem = ", dem_years2.size)
