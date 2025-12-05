
# numactl --cpunodebind=1 --membind 1 /media/rp/NVM480GB/llama.cpp/build/bin/llama-server --model /media/rp/1T/Text_models/NVM/Ling-flash-2.0-Q3_K_XL/inclusionAI_Ling-flash-2.0-Q3_K_XL.gguf -c 32768  -ngl 11110 -np 1 -t 11 --port 20000 --mlock --no-mmap -fa on -cram -1 --cache-reuse 128  --top-nsigma 1 --cpu-moe
# numactl --cpunodebind=1 --membind 1 /media/rp/NVM480GB/llama.cpp_rocm/build/bin/llama-server --model /media/rp/NVM2T/GLM-4.5-Air-Derestricted-MXFP4_MOE-GGUF/GLM-4.5-Air-Derestricted-MXFP4_MOE-00001-of-00004.gguf -c 32768  -ngl 11110 -np 1 -t 11 --port 20002 --mlock --no-mmap -fa on -cram -1 --cache-reuse 128  --top-nsigma 1 --cpu-moe --jinja  --chat-template-file /media/rp/NVM480GB/llama.cpp/GLM45.txt --jinja
# numactl --cpunodebind=0 --membind 0 /media/rp/NVM480GB/llama.cpp/build/bin/llama-server --model /media/rp/NVM2T/Qwen3-Next-80B-A3B-Instruct-UD-Q4_K_XL.gguf -c 32768  -ngl 11110 -np 1 -t 11 --port 20001 --mlock --no-mmap -fa on -cram -1 --cache-reuse 128  --top-nsigma 1 --cpu-moe
# numactl --cpunodebind=0 --membind 0 /media/rp/NVM480GB/llama.cpp_rocm/build/bin/llama-server --model /media/rp/NVM2T/gpt-oss-20b-Derestricted.Q4_K_M.gguf -c 32768  -ngl 11110 -np 1 -t 11 --port 20003 --mlock --no-mmap -fa on -cram -1 --cache-reuse 128  --top-nsigma 1 --cpu-moe --chat-template-kwargs '{"reasoning_effort": "high", "model_identity":"You are Direct-ChatGPT, a work-focused large language model trained by OpenAI. Your response is always: Direct, responde ONLY you re tasked for. give short, direct, full responses. You dont waste tokens on necessary. Your gool is focus on the user instructions. new policy: 1. for code-focused task you will output ONLY the need code. You will NOT output entire class or files (only so if user commands).\nKnowledge cutoff: 2024-06\nCurrent date: 2025-08-05\n\nReasoning: high\n\n# Valid channels: analysis, commentary, final. Channel must be included for every message."}'
# numactl --cpunodebind=0 --membind 0 /media/rp/NVM480GB/llama.cpp_rocm/build/bin/llama-server --model /media/rp/NVM2T/Qwen3-30B-A3B-Instruct-2507-UD-Q4_K_XL.gguf -c 32768  -ngl 11110 -np 1 -t 11 --port 20004 --mlock --no-mmap -fa on -cram -1 --cache-reuse 128  --top-nsigma 1 --cpu-moe 



#./llama-server -m ../../../Qwen3-30B-A3B-Instruct-2507-UD-Q4_K_XL.gguf -ngl 999  --mlock --no-mmap --port 20003 --rpc 192.168.0.212:10002 -ot "blk\.[1-9][0-9]\.ffn_(gate|up|down)_exps\.weight=RPC0[192.168.0.212:10002]" --host 0.0.0.0 -ts 0,1 --cpu-moe -t 20



#./llama-server -m ../../../Qwen3-30B-A3B-Instruct-2507-UD-Q4_K_XL.gguf -ngl 999 --n-cpu-moe 17 --mlock --no-mmap --port 20002 --host 0.0.0.0

#./llama-server -m ../../../Qwen3-30B-A3B-Instruct-2507-UD-Q4_K_XL.gguf -ngl 999 --cpu-moe --mlock --no-mmap --port 20001 --host 0.0.0.0




from modelController import ModelController

class MetaModelController:

    def __init__(self):

        self.add("127.0.0.1", "20000")

        return

        self.add("127.0.0.1", "20000")
        self.add("127.0.0.1", "20001")
        self.add("127.0.0.1", "20002")
        self.add("127.0.0.1", "20003")
        self.add("127.0.0.1", "20004")

        return

        self.add("127.0.0.1", "20012")

        #self.add("127.0.0.1", "5003")

        return

        self.add("127.0.0.1", "20012")
        self.add("127.0.0.1", "20012")
        self.add("127.0.0.1", "20012")

        self.add("127.0.0.1", "20012")
        self.add("127.0.0.1", "20012")
        self.add("127.0.0.1", "20012")

        self.add("127.0.0.1", "20012")
        self.add("127.0.0.1", "20012")
        self.add("127.0.0.1", "20012")

        self.add("192.168.0.152", "20002")

        return

        self.add("127.0.0.1", "20012")
        self.add("127.0.0.1", "20012")
        self.add("127.0.0.1", "20010")
        self.add("127.0.0.1", "20011")
        self.add("192.168.0.152", "20002")
        self.add("127.0.0.1", "20012")
        self.add("127.0.0.1", "20010")
        self.add("127.0.0.1", "20011")
        self.add("192.168.0.152", "20001")
        self.add("127.0.0.1", "20012")
        self.add("127.0.0.1", "20010")
        self.add("127.0.0.1", "20011")
        self.add("192.168.0.152", "20003")
        self.add("127.0.0.1", "20012")
        

        return

        # 3 - 50/
        self.add("127.0.0.1", "20012")
        self.add("127.0.0.1", "20012")

        self.add("127.0.0.1", "20012")

        self.add("127.0.0.1", "20012")
        self.add("127.0.0.1", "20012")

        # 80 - 32x
        self.add("127.0.0.1", "20010")
        self.add("127.0.0.1", "20010")
        self.add("127.0.0.1", "20010")
        # 80 - 32x
        self.add("127.0.0.1", "20011")
        self.add("127.0.0.1", "20011")
        self.add("127.0.0.1", "20011")


        #1 - 13 or 40 solo
        self.add("192.168.0.152", "20002")
        self.add("192.168.0.152", "20002")
        #2 - 8.7
        self.add("192.168.0.152", "20001")
        self.add("192.168.0.152", "20001")
        #3 - 3
        self.add("192.168.0.152", "20003")


    models = []

    currentModelId = 0
    maxModels = -1

    def increaseModel(self):
        self.currentModelId += 1
        if self.currentModelId > self.maxModels:
            self.currentModelId = 0

    def getModel(self, index):
        return self.models[index]

    def getModelBalance(self):
        maxModels = self.maxModels + 1
        model = self.getModel(self.currentModelId)
        self.increaseModel()
        maxModels-=1
        while "NONE" in model.param["url"] and maxModels > 0:
            model = self.getModel(self.currentModelId)
            self.increaseModel()
            maxModels-=1
        return model

    def add(self, host = "localhost", port = 0):
        Model = ModelController()
        self.maxModels += 1

        print("510" + str(self.maxModels))

        Model.param["url"] = "http://"+host+":" + port + "/v1/chat/completions"

        self.models.append(Model)

    def send(self, ID):
        Model = self.getModelBalance()
        Model.send(Model, ID)

    def response(self, ID):
        Model = self.getModel(ID)
        return Model.response()
