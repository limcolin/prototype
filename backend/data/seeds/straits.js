const straits = [
  {
    "sector": "East Johor Strait",
    "anchorages": [
      {
        "ACBTH": {
          "name": "Changi Barge Temporary Holding Anchorage",
          "description": "For barges loaded with sand/granite waiting to proceed to an approved aggregate terminal in the East Johor Strait or as directed by the Port Master.",
          "coordinates": [
            "01° 20.86′ N, 104° 03.03′ E",
            "01° 20.17′ N, 104° 03.73′ E",
            "01° 20.16′ N, 104° 03.0′ E",
            "01° 20.38′ N, 104° 02.8′ E"
          ]
        }
      },
      {
        "ACGP": {
          "name": "Changi General Purposes Anchorage",
          "description": "For general purpose, also for vessels requiring immigration clearance and bound for facilities in the East Johor Strait and vessels taking stores or performing crew changes.",
          "coordinates": [
            "01° 20.0′ N, 104° 03.15′ E",
            "01° 20.0′ N, 104° 03.6′ E",
            "01° 18.88′ N, 104° 04.72′ E",
            "01° 18.88′ N, 104° 04.18′ E"
          ]
        }
      },
      {
        "AEBA": {
          "name": "Eastern Bunkering A Anchorage",
          "description": "For vessels 20,000 g.t. and above, other than LPG and LNG carriers, chemical tankers, oil rigs and drill ships, to take bunkers under the Special Bunkering Anchorage Scheme.",
          "coordinates": [
            "01° 18.35′ N, 104° 02.79′ E",
            "01° 18.4′ N, 104° 02.19′ E",
            "01° 17.84′ N, 104° 02.74′ E",
            "01° 17.33′ N, 104° 02.8′ E"
          ]
        }
      },
      {
        "AEBB": {
          "name": "Eastern Bunkering B Anchorage",
          "description": "For vessels of 20,000 g.t. and above, other than LPG/LNG carriers, chemical tankers, oil rigs and drill ships, to take bunkers under the Special Bunkering Anchorage Scheme. Height restriction 49.0 m.",
          "coordinates": [
            "01° 17.5′ N, 103° 58.98′ E",
            "01° 17.65′ N, 104° 01.1′ E",
            "01° 17.15′ N, 104° 01.66′ E",
            "01° 16.63′ N, 103° 58.98′ E"
          ]
        }
      },
      {
        "AEBC": {
          "name": "Eastern Bunkering C Anchorage",
          "description": "For vessels 20,000 g.t. and above, other than LPG/LNG carriers, chemical tankers, oil rigs and drill ships, to take bunkers under the Special Bunkering Anchorage Scheme.",
          "coordinates": [
            "01° 16.63′ N, 103° 58.71′ E",
            "01° 16.11′ N, 103° 57.68′ E",
            "01° 16.11′ N, 103° 56.51′ E",
            "01° 16.63′ N, 103° 56.51′ E"
          ]
        }
      },
      {
        "AEPB": {
          "name": "Eastern Petroleum B Anchorage",
          "description": "For vessels loaded with petroleum and non gas free vessels. Height restriction 49.0 m.",
          "coordinates": [
            "01° 17.78′ N, 103° 56.01′ E",
            "01° 17.98′ N, 103° 56.51′ E",
            "01° 17.98′ N, 103° 57.62′ E",
            "01° 17.59′ N, 103° 58.71′ E",
            "01° 17.5′ N, 103° 58.71′ E",
            "01° 17.5′ N, 103° 56.01′ E"
          ]
        }
      },
      {
        "AEPBB": {
          "name": "Eastern Petroleum B Anchorage",
          "description": "For tankers of less than 10,000 g.t loaded with petroleum, non-gas free vessels and tankers requiring immigration clearance. Height restriction applicable. Vessels height greater than 30.0 m., not allowed to anchor within the 30.0 m. height restriction area limits as demarcated on the navigational chart.",
          "coordinates": [
            "01° 18.0′ N, 103° 56.57′ E",
            "01° 18.0′ N, 103° 58.71′ E",
            "01° 17.5′ N, 103° 58.71′ E",
            "01° 17.5′ N, 103° 56.0′ E"
          ]
        }
      },
      {
        "AEPBC": {
          "name": "Eastern Petroleum C Anchorage",
          "description": "For tankers of less than 10,000 g.t. loaded with petroleum, non-gas free vessels and tankers. Height restriction 30.0 m.",
          "coordinates": [
            "01° 18.0′ N, 103° 58.98′ E",
            "01° 18.0′ N, 104° 00.42′ E",
            "01° 17.65′ N, 104° 01.1′ E",
            "01° 17.5′ N, 103° 58.98′ E"
          ]
        }
      },
      {
        "AESPA": {
          "name": "Eastern Special Purposes A Anchorage",
          "description": "For vessels under arrest, damaged vessels, deep-draft vessels, vessels requiring repairs and other vessels. Port Master. Vessels greater than height 49.0 m. not allowed to anchor within the 49.0 metre height restriction area limits as demarcated on the navigational chart.",
          "coordinates": [
            "01° 17.78′ N, 103° 56.0′ E",
            "01° 17.5′ N, 103° 58.0′ E",
            "01° 17.5′ N, 103° 58.71′ E",
            "01° 16.63′ N, 103° 56.71′ E",
            "01° 16.63′ N, 103° 55.29′ E",
            "01° 17.2′ N, 103° 54.49′ E"
          ]
        }
      },
      {
        "ASCA": {
          "name": "Small Craft A Anchorage",
          "description": "For harbour tugs, pontoons, barges and other small craft, including fishing vessels. Height restriction 30.0 m.",
          "coordinates": [
            "01° 18.3′ N, 103° 57.33′ E",
            "01° 18.3′ N, 103° 58.71′ E",
            "01° 18.0′ N, 103° 58.71′ E",
            "01° 18.0′ N, 103° 56.57′ E"
          ]
        }
      },
      {
        "ASCB": {
          "name": "Small Craft B Anchorage",
          "description": "For harbour tugs, pontoons, barges and other small craft, including fishing vessels. Height restriction 30.0 m.",
          "coordinates": [
            "01° 18.3′ N, 103° 58.98′ E",
            "01° 18.3′ N, 103° 59.85′ E",
            "01° 18.0′ N, 104° 00.42′ E",
            "01° 18.0′ N, 103° 58.98′ E"
          ]
        }
      },
      {
        "AMOW": {
          "name": "Man-of-War Anchorage",
          "description": "For visiting warships.",
          "coordinates": [
            "01° 18.88′ N, 104° 03.55′ E",
            "01° 18.88′ N, 104° 04.18′ E",
            "01° 18.39′ N, 104° 04.62′ E",
            "01° 18.37′ N, 104° 03.55′ E"
          ]
        }
      },
      {
        "AEW": {
          "name": "Eastern Anchorage",
          "description": "For general purpose of receiving stores, water and bunkers, and waiting for berth facilities by vessels other than non-gas free petroleum vessels, LPG/LNG and chemical carriers.",
          "coordinates": [
            "01° 15.04′ N, 103° 51.77′ E",
            "01° 15.41′ N, 103° 51.73′ E",
            "01° 15.76′ N, 103° 52.21′ E",
            "01° 16.03′ N, 103° 52.02′ E",
            "01° 16.17′ N, 103° 52.22′ E",
            "01° 16.33′ N, 103° 52.11′ E",
            "01° 16.56′ N, 103° 52.43′ E",
            "01° 16.44′ N, 103° 52.49′ E",
            "01° 16.62′ N, 103° 52.72′ E",
            "01° 16.68′ N, 103° 52.63′ E",
            "01° 17.0′ N, 103° 53.1′ E",
            "01° 17.0′ N, 103° 53.91′ E",
            "01° 16.11′ N, 103° 54.88′ E",
            "01° 14.68′ N, 103° 52.68′ E",
            "01° 14.68′ N, 103° 52.18′ E",
            "01° 15.07′ N, 103° 52.29′ E",
            "01° 15.24′ N, 103° 52.12′ E",
            "01° 15.01′ N, 103° 51.8′ E",
            "01° 15.04′ N, 103° 51.77′ E"
          ]
        }
      },
      {
        "AEPA": {
          "name": "Eastern Petroleum A Anchorage",
          "description": "For tankers 20,000 g.t. and above loaded with petroleum, non-gas free vessels and tankers requiring immigration clearance.",
          "coordinates": [
            "01° 15.43′ N, 103° 53.81′ E",
            "01° 16.11′ N, 103° 54.88′ E",
            "01° 15.31′ N, 103° 55.74′ E",
            "01° 14.68′ N, 103° 54.58′ E",
            "01° 15.43′ N, 103° 51.77′ E"
          ]
        }
      },
      {
        "AEHA": {
          "name": "Eastern Holding A Anchorage",
          "description": "For vessels as directed by the Port Master.",
          "coordinates": [
            "01° 14.68′ N, 103° 54.58′ E",
            "01° 15.31′ N, 103° 55.74′ E",
            "01° 15.04′ N, 103° 56.04′ E",
            "01° 14.68′ N, 103° 55.38′ E"
          ]
        }
      },
      {
        "AEHB": {
          "name": "Eastern Holding B Anchorage",
          "description": "For vessels as directed by the Port Master.",
          "coordinates": [
            "01° 14.68′ N, 103° 52.68′ E",
            "01° 15.12′ N, 103° 53.36′ E",
            "01° 14.45′ N, 103° 54.06′ E",
            "01° 14.0′ N, 103° 53.28′ E"
          ]
        }
      },
      {
        "AEHC": {
          "name": "Eastern Holding C Anchorage",
          "description": "For port limit tankers that are waiting to service vessels in Keppel Harbour.",
          "coordinates": [
            "01° 15.01′ N, 103° 51.8′ E",
            "01° 15.23′ N, 103° 52.12′ E",
            "01° 15.07′ N, 103° 52.29′ E",
            "01° 14.68′ N, 103° 52.18′ E"
          ]
        }
      }
    ]
  },
  {
    "sector": "Western Sector",
    "anchorages" : [
      {
        "AWW": {
          "name": "Western Anchorage",
          "description": "For general purposes such as receiving stores, water, bunkers, and waiting for berth facilities in the west by vessels other non-gas free tankers, LPG/LNG carriers and chemical tankers.",
          "coordinates": [
            "01° 15.02′ N, 103° 47.81′ E",
            "01° 15.38′ N, 103° 48.17′ E",
            "01° 14.56′ N, 103° 49.1′ E",
            "01° 13.58′ N, 103° 49.59′ E",
            "01° 13.33′ N, 103° 49.03′ E"
          ]
        }
      },
      {
        "AWPA": {
          "name": "Western Petroleum A",
          "description": "For vessels of 10,000 g.t. or less loaded with petroleum and non-gas free vessels.",
          "coordinates": [
            "01° 14.54′ N, 103° 47.32′ E",
            "01° 15.02′ N, 103° 47.81′ E",
            "01° 14.22′ N, 103° 48.38′ E",
            "01° 13.95′ N, 103° 47.75′ E"
          ]
        }
      },
      {
        "AWPB": {
          "name": "Western Petroleum B Anchorage",
          "description": "For vessels of more than 10,000 g.t. but not exceeding 50,000 g.t., loaded with petroleum and non gas free vessels and oil tankers requiring immigration clearance.",
          "coordinates": [
            "01° 13.82′ N, 103° 47.46′ E",
            "01° 14.22′ N, 103° 48.38′ E",
            "01° 13.33′ N, 103° 49.03′ E",
            "01° 12.98′ N, 103° 48.25′ E"
          ]
        }
      },
      {
        "AWH": {
          "name": "Western Holding Anchorage",
          "description": "For vessels as directed by the Port Master.",
          "coordinates": [
            "01° 14.34′ N, 103° 47.12′ E",
            "01° 14.54′ N, 103° 47.32′ E",
            "01° 13.95′ N, 103° 47.75′ E",
            "01° 13.82′ N, 103° 47.46′ E",
            "01° 14.02′ N, 103° 47.28′ E"
          ]
        }
      },
      {
        "AWQI": {
          "name": "Western Quarantine and Immigration Anchorage",
          "description": "For vessels requiring quarantine and immigration clearance.",
          "coordinates": [
            "01° 13.13′ N, 103° 48.58′ E",
            "01° 13.58′ N, 103° 49.59′ E",
            "01° 13.15′ N, 103° 49.93′ E",
            "01° 12.8′ N, 103° 49.75′ E",
            "01° 12.75′ N, 103° 49.03′ E"
          ]
        }
      },
      {
        "ASPP": {
          "name": "Selat Pauh Petroleum Anchorage",
          "description": "For port limit tankers waiting to service vessels at the anchorages in the Jurong Sector, waiting for berth facilities in the West Jurong Channel and Pesek Basin or as directed by the Port Master.",
          "coordinates": [
            "01° 13.52′ N, 103° 42.58′ E",
            "01° 13.66′ N, 103° 42.83′ E",
            "01° 13.23′ N, 103° 43.37′ E",
            "01° 12.92′ N, 103° 43.27′ E",
            "01° 13.05′ N, 103° 42.93′ E",
            "01° 12.99′ N, 103° 42.83′ E"
          ]
        }
      },
      {
        "ASPLU": {
          "name": "Selat Pauh Anchorage",
          "description": "For vessels under arrest, laid-up vessels or other vessels on prior permission of the Port Master.",
          "coordinates": [
            "01° 13.66′ N, 103° 42.83′ E",
            "01° 13.78′ N, 103° 43.05′ E",
            "01° 13.48′ N, 103° 43.75′ E",
            "01° 13.31′ N, 103° 44.91′ E",
            "01° 13.41′ N, 103° 45.46′ E",
            "01° 13.18′ N, 103° 45.52′ E",
            "01° 12.81′ N, 103° 44.55′ E",
            "01° 12.81′ N, 103° 43.56′ E",
            "01° 12.92′ N, 103° 42.27′ E",
            "01° 13.23′ N, 103° 43.37′ E"
          ]
        }
      },
      {
        "ARP": {
          "name": "Raffles Petroleum Anchorage",
          "description": "For port limit tankers waiting to service vessels at the anchorages in the Jurong Sector, waiting for berth facilities in the West Jurong Channel and Pesek Basin or as directed by the Port Master.",
          "coordinates": [
            "01° 12.05′ N, 103° 44.17′ E",
            "01° 12.24′ N, 103° 44.41′ E",
            "01° 11.8′ N, 103° 45.04′ E",
            "01° 11.37′ N, 103° 44.51′ E"
          ]
        }
      },
      {
        "ARAFR": {
          "name": "Raffles Reserved Anchorage",
          "description": "For lash ship operations, vessels requiring emergency repairs and damaged vessels FSO/FPSOs or as directed by the Port Master.",
          "coordinates": [
            "01° 11.37′ N, 103° 44.51′ E",
            "01° 11.8′ N, 103° 45.04′ E",
            "01° 11.35′ N, 103° 45.7′ E",
            "01° 10.4′ N, 103° 45.0′ E"
          ]
        }
      }
    ]
  },
  {
    "sector": "Jurong Sector",
    "anchorages": [
      {
        "ASUEX": {
          "name": "Sudong Explosive Anchorage",
          "description": "For vessels and small craft loading or discharging explosives and Group 1 dangerous goods, or in transit with such cargo on board and other vessels as instructed by the Port Master.",
          "coordinates": [
            "01° 11.43′ N, 103° 42.14′ E",
            "01° 10.74′ N, 103° 42.66′ E",
            "01° 10.39′ N, 103° 42.4′ E",
            "01° 10.88′ N, 103° 41.73′ E"
          ]
        }
      },
      {
        "ASSPU": {
          "name": "Sudong Special Purpose Anchorage",
          "description": "For VLCCs above 75,000 g.t. requiring immigration clearance, or vessels as directed by the Port Master.",
          "coordinates": [
            "01° 11.76′ N, 103° 41.42′ E",
            "01° 11.43′ N, 103° 42.14′ E",
            "01° 10.88′ N, 103° 41.73′ E",
            "01° 11.36′ N, 103° 41.08′ E"
          ]
        }
      },
      {
        "ASH": {
          "name": "Sudong Holding Anchorage",
          "description": "Temporary holding anchorage with prior permission of Port Master.",
          "coordinates": [
            "01° 12.28′ N, 103° 40.28′ E",
            "01° 12.23′ N, 103° 40.37′ E",
            "01° 11.82′ N, 103° 40.27′ E",
            "01° 11.94′ N, 103° 39.82′ E"
          ]
        }
      },
      {
        "ASUBA": {
          "name": "Sudong Bunkering A Anchorage",
          "description": "For vessels of 20,000 g.t. and above, other than LPG/LNG carriers, chemical tankers, oil rigs and drill ships, to take bunkers under the Special Bunkering Anchorage Scheme.",
          "coordinates": [
            "01° 12.17′ N, 103° 40.51′ E",
            "01° 11.76′ N, 103° 40.42′ E",
            "01° 11.36′ N, 103° 40.08′ E",
            "01° 11.75′ N, 103° 40.57′ E",
            "01° 11.78′ N, 103° 40.44′ E"
          ]
        }
      },
      {
        "ASUBB": {
          "name": "Sudong Bunkering B Anchorage",
          "description": "For vessels of 20,000 g.t. and above, other than LPG/LNG carriers, chemical tankers, oil rigs and drill ships, to take bunkers under the Special Bunkering Anchorage Scheme.",
          "coordinates": [
            "01° 10.74′ N, 103° 42.66′ E",
            "01° 10.06′ N, 103° 43.17′ E",
            "01° 09.9′ N, 103° 43.05′ E",
            "01° 10.39′ N, 103° 42.4′ E"
          ]
        }
      },
      {
        "ASPH": {
          "name": "Sudong Petroleum Holding Anchorage",
          "description": "For port limit tankers waiting to service vessels at Sudong anchorages.",
          "coordinates": [
            "01° 10.06′ N, 103° 43.17′ E",
            "01° 09.77′ N, 103° 43.39′ E",
            "01° 09.71′ N, 103° 43.31′ E",
            "01° 09.9′ N, 103° 43.05′ E"
          ]
        }
      },
      {
        "ALGAS": {
          "name": "LNG/LPG/Chemical Gas Carriers Anchorage",
          "description": "For barges, LPG/LNG carriers, non-gas free LPG/LNG carriers, non-gas free chemical vessels/tankers and oil tankers requiring immigration clearance.",
          "coordinates": [
            "01° 13.81′ N, 103° 37.66′ E",
            "01° 14.5′ N, 103° 39.16′ E",
            "01° 13.78′ N, 103° 39.5′ E",
            "01° 13.06′ N, 103° 38.01′ E"
          ]
        }
      },
      {
        "AVLCC": {
          "name": "Very Large Crude Carrier Anchorage",
          "description": "For loaded VLCCs.",
          "coordinates": [
            "01° 13.29′ N, 103° 38.48′ E",
            "01° 13.78′ N, 103° 39.5′ E",
            "01° 12.97′ N, 103° 39.48′ E",
            "01° 12.64′ N, 103° 38.8′ E"
          ]
        }
      }
    ]
  }
];

module.exports = straits;
