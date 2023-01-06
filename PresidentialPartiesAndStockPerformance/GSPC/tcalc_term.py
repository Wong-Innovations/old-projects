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

presidents = {
    #'WW': 1921,
    #'WH': 1923,
    'CC': 1929,
    'HH': 1933,
    'FDR': 1945,
    'JFK': 1963,
    'LJ': 1969,
    'RN': 1974,
    'GF': 1977,
    'JECJ': 1981,
    'RR': 1989,
    'GHWB': 1993,
    'WJC': 2001,
    'GWB': 2009,
    'BO': 2016,
    'DJT': 2020,
}

p = ['CC', 'HH', 'FDR', 'JFK', 'LJ', 'RN', 'GF', 'JECJ', 'RR', 'GHWB', 'WJC', 'GWB', 'BO', 'DJT']

years = np.array([])
years2 = np.array([])
dem_years2 = np.array([])
rep_years2 = np.array([])

with open('gspc.csv', newline='') as csvfile:
    reader = csv.DictReader(csvfile)
    counter = 0
    months_sum = 0
    months_delta = 0
    for row in reader:
        counter += 1
        months_sum += float(row['Adj Close'])
        months_delta += 100*((float(row['Close']) - float(row['Open']))/float(row['Open']))
        if (counter % 12 == 0):
            years = np.append(years, months_sum/12)
            years2 = np.append(years2, months_delta/12)
            months_sum = months_delta = counter = 0

    pres_sum = 0
    current_pres = 0
    y = 0
    for i, x in np.ndenumerate(years2):
        if ((1928+i[0] in dem) and (1928+i[0] < presidents[p[current_pres]])):
            pres_sum += x
            y += 1
        elif ((1928+i[0] in dem) and (1928+i[0] == presidents[p[current_pres]])):
            pres_sum += x
            y += 1
            dem_years2 = np.append(dem_years2, pres_sum/y)
            pres_sum = y = 0
            current_pres += 1
        elif ((1928+i[0] in rep) and (1928+i[0] < presidents[p[current_pres]])):
            pres_sum += x
            y += 1
        elif ((1928+i[0] in rep) and (1928+i[0] == presidents[p[current_pres]])):
            pres_sum += x
            y += 1
            rep_years2 = np.append(rep_years2, pres_sum/y)
            pres_sum = y = 0
            current_pres += 1
    
    print("Dem Mean: ", np.mean(dem_years2))
    print("Dem Std. Dev: ", np.std(dem_years2))

    print("Rep Mean: ", np.mean(rep_years2))
    print("Rep Std. Dev: ", np.std(rep_years2))

    t = (np.mean(rep_years2)-np.mean(dem_years2))/(np.std(rep_years2)/(8**0.5))

    print("t =", t)
