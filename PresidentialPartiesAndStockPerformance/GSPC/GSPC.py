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

with open('gspc.csv', newline='') as csvfile:
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

    for i, x in np.ndenumerate(years2):
        if 1928+i[0] in rep:
            print("{ x:", 1928+i[0], ", y:", x, "},")

    print("\n\n")

    for j, y in np.ndenumerate(years2):
        if 1928+j[0] in dem:
            print("{ x:", 1928+j[0], ", y:", y, "},")
