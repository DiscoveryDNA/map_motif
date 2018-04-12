# Map Motif

## About

This script maps motifs across multiple sequence using the Biopython's motif package.

**File Inputs**: 
1. alignment (fasta) 
2. TFBS Position Frequency Matrix.

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

**Arguments**:
1. alignment fasta file
2. TFBS Position Frequency Matrix
3. optional -threshold score cutoff (outputs only scores greater than the specified threshold) 

## To Run

`python map_motif.py alignment.fa motif.fm 3.2`


