 🚀 AI-Based Cargo Inspection System

 📌 Overview

This project is an **AI-powered cargo inspection system** designed to automatically detect, classify, and analyze objects in cargo images. It helps identify **anomalies, suspicious items, and risks** using advanced deep learning techniques.

The system combines **object detection, classification, anomaly detection, and feature analysis** to generate a final **risk score with explanation**.

 🧠 System Architecture

🔄 Workflow Pipeline

1. **Input Cargo Image**

2. **Preprocessing**

   * Noise reduction
   * Contrast enhancement
   * Resize & normalization

3. **Object Detection**

   * YOLOv9 → Bounding boxes

4. **Object Classification**

   * ResNet50

5. **Feature Analysis**

   * Extract meaningful features from detected objects

6. **Parallel Processing**

   * 🔍 **Anomaly Detection (PatchCore)**
   * 🆚 **Image Comparison (YOLO + Siamese Network)**
   * 🧩 **Feature Extraction (CNN Backbone)**

7. **Risk Scoring Engine**

   * Combines all outputs to calculate risk

8. **Final Output**

   * Bounding Boxes
   * Labels
   * Heatmap
   * Risk Score
   * Explanation

---

## ✨ Features

* 📦 Automatic cargo object detection
* 🏷️ Multi-class classification
* ⚠️ Anomaly detection for suspicious items
* 🔥 Heatmap visualization for insights
* 📊 Risk scoring system
* 🧾 Explainable AI output

---

## 🛠️ Tech Stack

* Python
* YOLOv9
* ResNet50
* CNN (Feature Extraction)
* Siamese Network
* PatchCore (Anomaly Detection)

## 📊 Dataset

**Google Drive Link:**
👉 [https://drive.google.com/drive/folders/1P-PO7HvhOdZtozvzNPLpbNCiGZRY_XaZ?usp=sharing](https://drive.google.com/drive/folders/1FB9KOak--jIR9sfu4Yv8WiAjMUCuHywr)


## 🎯 Use Cases

* Airport cargo security
* Customs inspection
* Logistics & supply chain monitoring
* Smuggling detection









