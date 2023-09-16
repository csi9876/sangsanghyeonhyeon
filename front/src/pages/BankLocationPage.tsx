import React, { useEffect, useState } from "react";
import "./styles/BankLocationPage.css";
import useShinhanLocation from "../hooks/useShinhanLocation";
import { BankLocationType } from "../types/DataType";
declare const kakao: any;

const BankLocationPage = () => {
  const { BanknearbyKonKuk } = useShinhanLocation("서울");

  const [map, setMap] = useState<null | any>(null);

  console.log(BanknearbyKonKuk);
  useEffect(() => {
    const script = document.createElement("script");
    script.onload = () => {
      kakao.maps.load(() => {
        let container = document.getElementById("map");
        let options = {
          center: new kakao.maps.LatLng(37.541981, 127.078959),
          level: 6,
        };

        const createdMap = new kakao.maps.Map(container, options);

        setMap(createdMap);
      });
    };
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?appkey=9d2f5e313f7480e75807d0e7aa01170d";
    document.head.appendChild(script);
  }, []);

  // Add another useEffect for BanknearbyKonKuk state update
  useEffect(() => {
    if (map) {
      // Check if the map is already initialized
      BanknearbyKonKuk.forEach((location: BankLocationType) => {
        // 원하는 위치의 위도와 경도
        const markerPosition = new kakao.maps.LatLng(
          parseFloat(location.지점위도),
          parseFloat(location.지점경도)
        );

        // 마커를 생성
        let marker = new kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(map);

        let infowindow = new kakao.maps.InfoWindow({
          content:
            '<div style="width :auto; text-align:center;font-size:8px; padding :5px;color:#000;">신한은행 ' +
            location.지점명 +
            "</div>",
          removable: true,
        });

        infowindow.open(map, marker);
      });
    }
  }, [BanknearbyKonKuk]);

  function moveTo(name: string) {
    let location = BanknearbyKonKuk.find(
      (item: BankLocationType) => item.지점명 === name
    );
    if (location && map) {
      map.panTo(
        new kakao.maps.LatLng(
          parseFloat(location.지점위도),
          parseFloat(location.지점경도)
        )
      );
    }
  }

  return (
    <div className="BankLocationPage">
      <div className="mapCard">
        <h2 className="title">가까운 영업점</h2>
        <div
          id="map"
          style={{ width: "90%", height: "300px", margin: "auto" }}
        ></div>
      </div>
      <div className="bankName">
        <h2 className="title" style={{ color: "white" }}>
          건국대학교에서 가까운 지점입니다.
        </h2>

        <div className="bankCard">
          {BanknearbyKonKuk.map((location: BankLocationType, index) => (
            <div className="locationWrapper">
              <h3
                key={index}
                onClick={() => moveTo(location.지점명)}
                className="box"
              >
                신한은행 {location.지점명} 지점
              </h3>
              <a href={`tel:${location.지점대표전화번호}`}>전화기 클릭</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BankLocationPage;
