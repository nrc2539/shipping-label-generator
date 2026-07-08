"use client";

import { Document, Page, View, Text, StyleSheet, PDFViewer, Font } from "@react-pdf/renderer";

import type { ShippingLabelPreviewProps } from "./interface";

Font.register({
  family: "Sarabun",
  fonts: [
    { src: "/fonts/Sarabun-Regular.ttf", fontWeight: 400 },
    { src: "/fonts/Sarabun-Medium.ttf", fontWeight: 500 },
    { src: "/fonts/Sarabun-SemiBold.ttf", fontWeight: 600 },
    { src: "/fonts/Sarabun-Bold.ttf", fontWeight: 700 },
  ],
});

Font.registerHyphenationCallback((word) => {
  if (word.includes('ำ')) {
    // แยกสระอำออกเป็นตัวนิคหิต (ํ) และสระอา (า) เพื่อความเสถียรในการเรนเดอร์
    return word.split('ำ').join('ํา').split('');
  }
  return [word]
});

const A4_WIDTH = 210; // in mm
const A4_HEIGHT = 297;
const DEFAULT_COLOR = "#111";
const FULL_LAYOUT_SPACING = 20;
const QUARTER_LAYOUT_SPACING = 8;


const sectionPosition: Record<number, { top: number; left: number }> = {
  1: { top: 0, left: 0 },
  2: { top: 0, left: A4_WIDTH / 2 },
  3: { top: A4_HEIGHT / 2, left: 0 },
  4: { top: A4_HEIGHT / 2, left: A4_WIDTH / 2 },
};

const fullStyles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: "Sarabun",
    fontSize: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 700,
    marginBottom: FULL_LAYOUT_SPACING,
    color: DEFAULT_COLOR,
    borderBottomWidth: 1,
    borderBottomColor: DEFAULT_COLOR,
    paddingBottom: FULL_LAYOUT_SPACING,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    marginBottom: FULL_LAYOUT_SPACING,
  },
  label: {
    fontWeight: 700,
    color: DEFAULT_COLOR,
    marginRight: 8,
  },
  value: {
    fontWeight: 400,
    flex: 1,
  },
  addressContainer: {
    flex: 1,
    minHeight: 65,
  },
  halfSection: {
    flex: 1,
  },
  wrapper: {
    borderWidth: 2,
    borderColor: DEFAULT_COLOR,
    padding: FULL_LAYOUT_SPACING,
    margin: 10,
    flex: 1,
  },
});

const quarterStyles = StyleSheet.create({
  labelContainer: {
    position: "absolute",
    width: "50%",
    height: "50%",
    padding: QUARTER_LAYOUT_SPACING,
    fontFamily: "Sarabun",
  },
  labelWrapper: {
    width: "100%",
    height: "100%",
    borderWidth: 1,
    borderColor: DEFAULT_COLOR,
    padding: QUARTER_LAYOUT_SPACING,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 700,
    marginBottom: QUARTER_LAYOUT_SPACING,
    color: DEFAULT_COLOR,
    borderBottomWidth: 0.5,
    borderBottomColor: DEFAULT_COLOR,
    paddingBottom: QUARTER_LAYOUT_SPACING,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    marginBottom: QUARTER_LAYOUT_SPACING,
  },
  label: {
    fontWeight: 700,
    color: DEFAULT_COLOR,
    fontSize: 9,
    marginRight: 8,
  },
  value: {
    fontWeight: 400,
    flex: 1,
    fontSize: 9,
    breakWord: "break-word"
  },
  addressContainer: {
    flex: 1,
    minHeight: 36,
  },
  halfSection: {
    flex: 1,
  },
});

function LabelContent({
  styles,
  data,
  layout,
}: {
  layout: ShippingLabelPreviewProps["layout"];
  styles: typeof fullStyles | typeof quarterStyles;
  data: ShippingLabelPreviewProps["data"];
}) {

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.halfSection}>
        <Text style={styles.sectionTitle}>ผู้ส่ง (Sender)</Text>
        <View style={styles.row}>
          <Text style={styles.label}>ชื่อ (Name) :</Text>
          <Text style={styles.value}>{data.senderName || "-"}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>ที่อยู่ (Address) :</Text>
          <View style={styles.addressContainer}>
            <Text style={styles.value}>{data.senderAddress || "-"}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>เบอร์โทร (Tel.) :</Text>
          <Text style={styles.value}>{data.senderPhone || "-"}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>รหัสไปรษณีย์ (Postal Code) :</Text>
          <Text style={styles.value}>{data.senderPostalCode || "-"}</Text>
        </View>
      </View>

      <View style={styles.halfSection}>
        <View style={{ borderTopWidth: layout === "full" ? 1 : 0.5, borderTopColor: DEFAULT_COLOR, paddingTop: layout === "full" ? FULL_LAYOUT_SPACING : QUARTER_LAYOUT_SPACING, marginLeft: layout === "full" ? -FULL_LAYOUT_SPACING : -QUARTER_LAYOUT_SPACING, marginRight: layout === "full" ? -FULL_LAYOUT_SPACING : -QUARTER_LAYOUT_SPACING }} />
        <Text style={styles.sectionTitle}>ผู้รับ (Recipient)</Text>
        <View style={styles.row}>
          <Text style={styles.label}>ชื่อ (Name) :</Text>
          <Text style={styles.value}>{data.recipientName || "-"}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>ที่อยู่ (Address) :</Text>
          <View style={styles.addressContainer}>
            <Text style={styles.value}>{data.recipientAddress || "-"}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>เบอร์โทร (Tel.) :</Text>
          <Text style={styles.value}>{data.recipientPhone || "-"}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>รหัสไปรษณีย์ (Postal Code) :</Text>
          <Text style={styles.value}>{data.recipientPostalCode || "-"}</Text>
        </View>
      </View>
    </View>
  );
}

export default function ShippingLabelPreview({
  data,
  layout = "full",
  copies = 1,
}: ShippingLabelPreviewProps) {
  return (
    <PDFViewer style={{ width: "100%", height: "100%" }}>
      <Document>
        <Page size="A4" style={{ fontFamily: "Sarabun" }}>
          {Array.from({ length: copies }).map((_, index) => {
            if (layout === "quarter") {
              const sectionIndex = (index % 4) + 1; // 1 to 4
              const pos = sectionPosition[sectionIndex];
              return (<View
                break={index > 0 && index % 4 === 0}
                key={index}
                style={[
                  quarterStyles.labelContainer,
                  { top: `${pos.top}mm`, left: `${pos.left}mm` },
                ]}
              >
                <View style={quarterStyles.labelWrapper}>
                  <LabelContent styles={quarterStyles} data={data} layout={layout} />
                </View>
              </View>)
            }
            return (<View key={index} style={fullStyles.wrapper} break={index > 0}>
              <LabelContent styles={fullStyles} data={data} layout={layout} />
            </View>)
          })}

        </Page>
      </Document>
    </PDFViewer>
  );
}
