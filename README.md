# Map Motif

## About

This script maps motifs across multiple sequence using the Biopython's motif package.

**Inputs**: 
1. before alignment (fasta) 
2. after alignment (fasta) 
3. TFBS Position Frequency Matrix.

**Outputs**:
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

`python map_motif.py alignment.fa motif.fm`


