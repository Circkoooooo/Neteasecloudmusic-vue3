<script lang="ts" setup>
import './ListBox.less';

interface ListBox {
	title: string,
	gotoDetailBtnName?: string,
	paddingVal: string
}
withDefaults(defineProps<ListBox>(), {});

</script>

<template>
	<div class="list_box">
		<div class="box_header"
				:style="{
					padding: paddingVal
				}">
			<div class="title">
				{{ title }}
			</div>
			<div class="detail">
				{{ gotoDetailBtnName }}
			</div>
		</div>
		<slot></slot>
	</div>
</template>
