import {useState, useEffect} from 'react';
import { getUserByPointsRank } from "../api/user"
import ScoreItem from "./ScoreItem";
import { Card } from "antd";

/**
 * 积分排名
 */
function ScoreRank(props) {

    // 存储用户排名信息的
    const [userRankInfo, setUserRankInfo] = useState([]);

    useEffect(()=>{
        async function fetchUser(){
            const { data } = await getUserByPointsRank();
            setUserRankInfo(data);
        } 
        fetchUser();
    },[])


    const userPointsRankArr = [];
    if(userRankInfo.length){
        for(let i=0;i<userRankInfo.length;i++){
            userPointsRankArr.push(
                <ScoreItem 
                    rankInfo={userRankInfo[i]}
                    rank={i+1}
                    key={userRankInfo[i]._id}
                />
            )
        }
    }

    return (
        <Card title="积分排行榜">
            {userPointsRankArr}
        </Card>
    );
}

export default ScoreRank;