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
        2019
]

years = np.array([])
dem_years2 = np.array([])
rep_years2 = np.array([])

number_of_recessions = 0
dem_rec = rep_rec = 0

with open('nber.csv', newline='') as csvfile:
    reader = csv.DictReader(csvfile, delimiter=',')
    counter = 0
    number_of_months = 0
    current_year = 1915
    for row in reader:
        number_of_months += int(row['USREC'])
        counter += 1
        if (int(row['USREC']) == 1):
            number_of_recessions += 1
            if current_year in dem:
                dem_rec += 1
            if current_year in rep:
                rep_rec += 1
        if (counter % 12 == 0):
            years = np.append(years, number_of_months/12)
            if current_year in dem:
                dem_years2 = np.append(dem_years2, number_of_months/12)
            if current_year in rep:
                rep_years2 = np.append(rep_years2, number_of_months/12)
            counter = number_of_months = 0
            current_year += 1

    print("Number of recessions (dem): ", dem_rec)
    print("Number of recessions (rep): ", rep_rec)
    print("Number of recessions (total): ", number_of_recessions)
    
    print("Dem Mean: ", np.mean(dem_years2))
    print("Dem Std. Dev: ", np.std(dem_years2))

    print("Rep Mean: ", np.mean(rep_years2))
    print("Rep Std. Dev: ", np.std(rep_years2))

    t = (np.mean(rep_years2)-np.mean(years))/(np.std(rep_years2)/(rep_years2.size**0.5))

    print("t_rep =", 2*t)
    print("DoF_rep = ", rep_years2.size)

    t = (np.mean(dem_years2)-np.mean(years))/(np.std(dem_years2)/(dem_years2.size**0.5))

    print("t_dem =", 2*t)
    print("DoF_dem = ", dem_years2.size)
