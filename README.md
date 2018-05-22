# Map Motif

## About

This repository houses code that maps TFBS onto alignments. The purpose is to identify where TFBS are in an alignment. There are currently three aspects of the code, located in  `/code` directory.

1. the `map+motif.py` script that can be implemented in command line. 
2. `motif_scoring_and_extraction.ipynb` that is a jupyter notebook of the script for interactive coding and visualization 
3. The `/D3_vis` portion, which is a working project to visualize TFBS interactively in the browser. 

### `map_motif.py` 

`map_motif.py` is a python script that has two inputs.

**File Inputs**: 
1. alignment (fasta) 
2. TFBS Position Frequency Matrix.

**Arguments**:
1. alignment fasta file
2. TFBS Position Frequency Matrix
3. optional -threshold score cutoff (outputs only scores greater than the specified threshold) 

**File Outputs**:
-`.csv` file that outputs found TFBSs at *each position*, if any, in alignment. 

Output data frame includes:
-  position
-  score
-  sequence entry
-  raw_position (from each sequence entry)
-  strand (which direction the motif was found)
-  motif_found (sequence motif at each postion)

The output file will be saved in directory script was ran.

Example output file: `map_motif-alignment.fa-motif.fm.csv`

## To Run

`python map_motif.py alignment.fa motif.fm 3.2`


